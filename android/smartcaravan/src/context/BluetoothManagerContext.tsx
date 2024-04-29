import React, {Dispatch, DispatchWithoutAction, useEffect, useMemo, useState} from "react";
import BluetoothDevice from "../model/BluetoothDevice.ts";
import {NativeEventEmitter, NativeModules, ToastAndroid} from "react-native";
import BleManager, {Peripheral} from "react-native-ble-manager";
import {EmitterSubscription} from "react-native/Libraries/vendor/emitter/EventEmitter";
import {convertPeripheralToBluetoothDevice, grantBluetoothPermissions} from "../util/BluetoothUtil.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BleManagerModule = NativeModules.BleManager;

interface IBluetoothManagerContextValue {
    scanning: boolean,
    connecting: boolean,
    connectedDevice: BluetoothDevice,
    fetchPairedDevices: DispatchWithoutAction,
    pairedDevices: BluetoothDevice[],
    discoveredDevices: BluetoothDevice[],
    connectDevice: Dispatch<BluetoothDevice>,
    disconnectDevice: Dispatch<BluetoothDevice>,
    reconnectDevice: DispatchWithoutAction,
    scanStart: DispatchWithoutAction,
    scanStop: DispatchWithoutAction,
    bluetoothConnectionError: string,
    isDeviceConnected: (device: BluetoothDevice | undefined) => boolean,
    initBluetoothDevice : ()=>Promise<void>
}


const _bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
let _discoverListener: EmitterSubscription | null = null;
let _stopScanListener: EmitterSubscription | null = null;

export const BluetoothManagerContext = React.createContext<IBluetoothManagerContextValue>({
    scanning: false,
    connecting: false,
    connectedDevice: new BluetoothDevice(),
    pairedDevices: [],
    discoveredDevices: [],
    bluetoothConnectionError: "",
    connectDevice: (device: BluetoothDevice) => {
    },
    disconnectDevice: (device: BluetoothDevice) => {
    },
    isDeviceConnected: (device: BluetoothDevice | undefined) => false,
    fetchPairedDevices: () => [],
    reconnectDevice: () => {
    },
    scanStart: () => {
    },
    scanStop: () => {
    },
    initBluetoothDevice : ()=>new Promise(()=>{})
});

export const BluetoothManagerContextProvider = ({children}: { children: any }) => {
    const [bluetoothConnectionError, setBluetoothConnectionError] = useState<string>("");
    const [scanning, setScanning] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice>(new BluetoothDevice());
    const [pairedDevices, setPairedDevices] = useState<BluetoothDevice[]>([]);
    const [discoveredDevices, setDiscoveredDevices] = useState<BluetoothDevice[]>([]);

    const onDeviceDiscovered = (device: BluetoothDevice) => {
        if(discoveredDevices.findIndex(d=>(d.id === device.id)) >= 0){
            return;
        }
        console.log("device discovered", device);
        discoveredDevices.push(device);
        console.log("all device discovered", discoveredDevices);
        setDiscoveredDevices(Object.assign([], discoveredDevices));
    }
    const onScanStopped = () => {
        setScanning(false);
        console.log("scan stopped")
    }
    const setLastConnectedDevice = async (device:BluetoothDevice) => {
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
            if(!jsonValue){
                return null;
            }
            let parse = JSON.parse(jsonValue);
            let device :BluetoothDevice= Object.assign(new BluetoothDevice(), parse);
            return device;
        } catch (e) {
            // error reading value
        }
    };


    const connectDevice = (device: BluetoothDevice) => {
        setConnecting(true);
        console.log("connecting")
        bleManager.connect(device.id)
            .then(res => {
                let bluetoothDevice = device.clone();
                setConnectedDevice(bluetoothDevice);
                setLastConnectedDevice(bluetoothDevice).then();
                console.log("connected")
            })
            .catch(err => {
                setBluetoothConnectionError(err);
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
                setConnecting(false);
                if (!connected) {
                    setConnectedDevice(new BluetoothDevice());
                    return;
                }
                bleManager.disconnect(connectedDevice.id).then(res => {
                    setConnectedDevice(new BluetoothDevice());
                })
            })
    }

    const reconnectDevice = () => {
        getLastConnectedDevice().then((lastConnectedDevice:BluetoothDevice|null|undefined)=>{
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

    const isDeviceConnected = (device: BluetoothDevice | undefined = undefined) => {
        if (!connectedDevice) {
            return false;
        }
        if (!device) {
            return !!connectedDevice.id && connectedDevice.id !== "";
        }
        return device.id === connectedDevice.id;
    }

    const bleManager = useMemo(() => {
        console.log("use memo")
        _discoverListener = _bleManagerEmitter.addListener(
            "BleManagerDiscoverPeripheral",
            (peripheral: Peripheral) => {
                if (!peripheral.id || !peripheral.name) {
                    return;
                }
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

        return BleManager
    }, []);

    const fetchPairedDevices = () => {
        bleManager.getBondedPeripherals().then(res => {
            const devices = res.map(p => convertPeripheralToBluetoothDevice(p))
            setPairedDevices(devices);
        })
    }

    const initBluetoothDevice = async ()=>{
        await grantBluetoothPermissions();
        await bleManager.enableBluetooth();
        console.log("inint");

        return bleManager.start({
            showAlert : true
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
        }
    }, []);


    return <BluetoothManagerContext.Provider value={
        {
            scanning: scanning,
            connecting: connecting,
            connectedDevice: connectedDevice,
            fetchPairedDevices: fetchPairedDevices,
            pairedDevices: pairedDevices,
            discoveredDevices: discoveredDevices,
            connectDevice: connectDevice,
            disconnectDevice: disconnectDevice,
            reconnectDevice: reconnectDevice,
            scanStart: scanStart,
            scanStop: scanStop,
            isDeviceConnected: isDeviceConnected,
            bluetoothConnectionError: bluetoothConnectionError,
            initBluetoothDevice : initBluetoothDevice
        }
    }>
        {children}
    </BluetoothManagerContext.Provider>
}