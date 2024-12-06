import React, {Dispatch, DispatchWithoutAction, useEffect, useMemo, useState} from "react";
import BluetoothDevice from "../model/BluetoothDevice.ts";
import {NativeEventEmitter, NativeModules, ToastAndroid} from "react-native";
import BleManager, {Peripheral} from "react-native-ble-manager";
import {EmitterSubscription} from "react-native/Libraries/vendor/emitter/EventEmitter";
import {
    COMMAND_PRINT_ALL,
    convertPeripheralInfoToBluetoothDevice,
    convertPeripheralToBluetoothDevice,
    grantBluetoothPermissions,
    parseBluetoothData
} from "../util/BluetoothUtil.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SensorValues from "../model/SensorValues.ts";
import { handleData } from "./BluetoothTestData.ts";

const BleManagerModule = NativeModules.BleManager;

export interface IBluetoothManagerContextValue {
    scanning: boolean,
    connecting: boolean,
    connectedDevice: BluetoothDevice | undefined,
    discoveredDevices: BluetoothDevice[],
    connectDevice: Dispatch<BluetoothDevice>,
    disconnectDevice: Dispatch<BluetoothDevice | undefined>,
    reconnectDevice: DispatchWithoutAction,
    scanStart: DispatchWithoutAction,
    scanStop: DispatchWithoutAction,
    bluetoothState: string,
    isDeviceConnected: (device: BluetoothDevice) => boolean,
    initBluetoothDevice: () => Promise<void>;
    readAllValues: () => void;
    dataUpdateTime: number;
    sensorsData: SensorValues;
    sendCommand: Dispatch<string>;
    isScreenLandscape:()=>boolean
}


const _bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
let _discoverListener: EmitterSubscription | null = null;
let _stopScanListener: EmitterSubscription | null = null;
let _didUpdateValueForCharacteristicListener: EmitterSubscription | null = null;
let _didUpdateStateListener: EmitterSubscription | null = null;
let _didConnectPeripheralListener: EmitterSubscription | null = null;
let _didDisconnectPeripheralListener: EmitterSubscription | null = null;


export const BluetoothManagerContext = React.createContext<IBluetoothManagerContextValue>({});

export const BluetoothManagerContextProvider = ({children}: { children: any }) => {
    const [bluetoothState, setBluetoothState] = useState<string>("");
    const [scanning, setScanning] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | undefined>(undefined);
    const [discoveredDevices, setDiscoveredDevices] = useState<BluetoothDevice[]>([]);
    const [data, setData] = useState<SensorValues>(new SensorValues());
    const [dataUpdateTime, setDataUpdateTime] = useState(0);
    const [isScreenOrientationLandscape, setIsScreenOrientationLandscape] = useState(false);

    const onDeviceDiscovered = (device: BluetoothDevice) => {
        if (discoveredDevices.findIndex(d => (d.id === device.id)) >= 0) {
            return;
        }
        // console.log("device discovered", device);
        discoveredDevices.push(device);
        // console.log("all device discovered", discoveredDevices);
        setDiscoveredDevices(Object.assign([], discoveredDevices));
    }
    const onScanStopped = () => {
        setScanning(false);
        // console.log("scan stopped")
    }

    const setLastConnectedDevice = async (device: BluetoothDevice) => {
        try {
            const jsonValue = JSON.stringify(device);
            await AsyncStorage.setItem('last-connected-device', jsonValue);
        } catch (err) {
            ToastAndroid.show("Error save last-connected-device", 5);
        }
    };

    const getLastConnectedDevice = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('last-connected-device');
            if (!jsonValue) {
                return null;
            }
            let parse = JSON.parse(jsonValue);
            let device: BluetoothDevice = Object.assign(new BluetoothDevice(), parse);
            console.log("last connected device", device)
            return device;
        } catch (err: any) {
            ToastAndroid.show(err.toString(), 2000);
        }
    };


    const connectDevice = (device: BluetoothDevice) => {
        setConnecting(true);
        console.log("connecting")
        bleManager.connect(device.id, {autoconnect: true})
            .then(async res => {
                const peri = await bleManager.retrieveServices(device.id);
                console.log("peri", peri);
                let bluetoothDevice = convertPeripheralInfoToBluetoothDevice(peri);
                setConnectedDevice(bluetoothDevice);
                setLastConnectedDevice(bluetoothDevice).then();
                console.log("connected")
                await bleManager.requestMTU(device.id, 500);
                console.log("request mtu to 500")
                await bleManager.startNotification(bluetoothDevice.id, bluetoothDevice.serviceUUID, bluetoothDevice.characteristic);
            })
            .catch(err => {
                ToastAndroid.show("Error : " + err, 5);
                console.log("Error", err);
            })
            .finally(() => {
                scanStop();
                setConnecting(false);
            })
    }

    const disconnectDevice = () => {
        if (!connectedDevice) {
            return;
        }

        bleManager.isPeripheralConnected(connectedDevice.id)
            .then((connected) => {
                // console.log("isPeripheralConnected", connected)
                setConnecting(false);
                if (!connected) {
                    setConnectedDevice(undefined);
                    return;
                }
                bleManager.disconnect(connectedDevice.id).then(async res => {
                    setConnectedDevice(undefined);
                    console.log("disconnected ")
                })
            })
    }

    const reconnectDevice = () => {
        if(connecting){
            disconnectDevice();
            setConnecting(false);
            return;
        }
        getLastConnectedDevice().then((lastConnectedDevice: BluetoothDevice | null | undefined) => {
            if (!lastConnectedDevice) {
                return;
            }
            connectDevice(lastConnectedDevice);
        })


    }

    const scanStart = () => {
        setDiscoveredDevices([]);
        bleManager.scan([], 30, false)
            .then(() => {
                console.log("scan started")
                setScanning(true);
            }).catch(err => {
            console.log("scan error", err);
        })
    }
    const scanStop = () => {
        bleManager.stopScan().then();
    }

    const isDeviceConnected = (device: BluetoothDevice) => {
        if (!connectedDevice) {
            return false;
        }
        if (!device) {
            return !!connectedDevice.id && connectedDevice.id !== "";
        }
        return device.id === connectedDevice.id;
    }

    const bleManager = useMemo(() => {
        // console.log("use memo")
        
        _discoverListener = _bleManagerEmitter.addListener(
            "BleManagerDiscoverPeripheral",
            (peripheral: Peripheral) => {
                if (!peripheral.id || !peripheral.name) {
                    return;
                }
                // console.log("peripheral", peripheral);
                let bluetoothDevice = convertPeripheralToBluetoothDevice(peripheral);
                onDeviceDiscovered(bluetoothDevice);
            }
        );

        _stopScanListener = _bleManagerEmitter.addListener(
            'BleManagerStopScan',
            () => {
                onScanStopped();
            },
        );

        _didUpdateValueForCharacteristicListener = _bleManagerEmitter.addListener(
            'BleManagerDidUpdateValueForCharacteristic',
            (d) => {
                console.log("BleManagerDidUpdateValueForCharacteristic", d);
                let sv = parseBluetoothData(d.value, data);
                setData(sv);
                setDataUpdateTime(new Date().getTime());
                console.log("data", sv);
            },
        );

        _didUpdateStateListener = _bleManagerEmitter.addListener(
            'BleManagerDidUpdateState',
            (data) => {
                setBluetoothState(data?.state);
                console.log("bluetooth state " + data?.state);
            },
        );

        _didDisconnectPeripheralListener = _bleManagerEmitter.addListener(
            'BleManagerConnectPeripheral',
            (data) => {
                setBluetoothState(data?.state);
                console.log("BleManagerConnectPeripheral " + data?.state);
            },
        );

        _didConnectPeripheralListener = _bleManagerEmitter.addListener(
            'BleManagerDisconnectPeripheral',
            (data) => {
                setBluetoothState(data?.state);
                console.log("BleManagerConnectPeripheral " + data?.state);
            },
        );


        return BleManager
    }, []);


    const initBluetoothDevice = async () => {
        await grantBluetoothPermissions();
        await bleManager.enableBluetooth();
        console.log("init");

        return bleManager.start({
            showAlert: true
        });
    }

    useEffect(() => {
        return () => {
            if (_discoverListener) {
                _discoverListener.remove();
            }
            if (_stopScanListener) {
                _stopScanListener.remove();
            }
            if (_didUpdateValueForCharacteristicListener) {
                _didUpdateValueForCharacteristicListener.remove();
            }
            if (_didUpdateStateListener) {
                _didUpdateStateListener.remove();
            }
            if (_didDisconnectPeripheralListener) {
                _didDisconnectPeripheralListener.remove();
            }
            if (_didConnectPeripheralListener) {
                _didConnectPeripheralListener.remove();
            }
        }
    }, []);


    const writeDataOnConnectedDevice = (data: string) => {
        if (!connectedDevice) {
            return;
        }
    
        let commandArray : number[] = [];
        const len = data.length;
        for (let index = 0; index < len; index++) {
            const element:number = data.charCodeAt(index);
            commandArray[index] = element;
            
        }

        bleManager.writeWithoutResponse(connectedDevice.id, connectedDevice.serviceUUID, connectedDevice.characteristic,commandArray)
            .then((res) => {
                // console.log("res writeWithoutResponse", res);
            })
            .catch(err => {
                console.log("err writeWithoutResponse", err);
            })

    }

    const sendCommand = (command: string) => {
        console.log("send command", command);
        // writeDataOnConnectedDevice(command);
        handleData(command, data)
        .then((res:SensorValues)=>{
            setData(res);
        });
    }
    const readAllValues = () => {
        sendCommand(COMMAND_PRINT_ALL);
    }

    const isScreenLandscape = ()=>{
        return isScreenOrientationLandscape;
    }

    return <BluetoothManagerContext.Provider value={
        {
            scanning: scanning,
            connecting: connecting,
            connectedDevice: connectedDevice,
            discoveredDevices: discoveredDevices,
            connectDevice: connectDevice,
            disconnectDevice: disconnectDevice,
            reconnectDevice: reconnectDevice,
            scanStart: scanStart,
            scanStop: scanStop,
            isDeviceConnected: isDeviceConnected,
            bluetoothState: bluetoothState,
            initBluetoothDevice: initBluetoothDevice,
            readAllValues: readAllValues,
            dataUpdateTime: dataUpdateTime,
            sensorsData: data,
            sendCommand: sendCommand,
            isScreenLandscape: isScreenLandscape
        }
    }>
        {children}
    </BluetoothManagerContext.Provider>
}