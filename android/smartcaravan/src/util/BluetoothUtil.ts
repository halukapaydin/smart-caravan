import {PermissionsAndroid, Platform} from "react-native";
import {Peripheral} from "react-native-ble-manager";
import BluetoothDevice from "../model/BluetoothDevice.ts";
import SensorValues from "../model/SensorValues.ts";


const PERMISSIONS = [
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
]

export const grantBluetoothPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {

        // Object.keys(PermissionsAndroid.PERMISSIONS).forEach(e => {
            // console.log(e);
        // })
        // console.log("----------------------------")

        try {
            for (const permission of PERMISSIONS) {
                try {
                    const g = await PermissionsAndroid.request(permission);
                    // console.log(permission + " state is " + g);
                } catch (e) {
                    console.log('Error requesting location permission:', e);
                }
            }

        } catch (error) {
            console.log('Error requesting location permission:', error);
        }
    }
};

// @ts-ignore
export const convertPeripheralToBluetoothDevice = (peripheral: Peripheral | any) => {
    let device = new BluetoothDevice(
        peripheral.name,
        peripheral.id,
        peripheral.rssi,
        peripheral.connected,
        peripheral.serviceUUIDs
    );
    return device;
}


export const parseBluetoothData = (data: number[], sensorValue: SensorValues) => {
    for (let i = 0; i < data.length; i++) {
        let key = data[i];
        if(key === 255){
            break;
        }
        let value = data[++i];
        if (key >= 1 && key <= 16) {
            sensorValue.setButtonValue(key, value);
        } else if (key === 18) {
            sensorValue.setHumidityValue(value);
        } else if (key === 17) {
            sensorValue.setTemperatureValue(value);
        } else if (key === 19) {
            sensorValue.setCleanWaterLevel(value);
        } else if (key == 20) {
            sensorValue.setGrayWaterLevel(value);
        } else if (key == 21) {
            sensorValue.setBlackWaterLevel(value);
        } else if (key == 22) {
            sensorValue.setBatteryVoltage(value);
        }
    }
    // console.log("parse data", data, sensorValue);
    return sensorValue;
}


export const COLOR_PRIMARY = "#3b3b3b";
export const COLOR_SECONDARY = "#232323";
export const COLOR_BACKGROUND = "#252525";
export const COLOR_DISABLED = "#5e90ff";
export const COLOR_SCAN_BUTTON = "#5e90ff";
export const COLOR_HIGHLIGHT = "#ffff00";

export const SERVICE_UUID: string = "ffe0";
export const CHARACTERISTIC_UUID: string = "ffe1";
export const COMMAND_KEY_DATA_SEND_TEMPERATURE_AND_HUMIDITY: number = 18;
export const COMMAND_KEY_DATA_SEND_ALL: number = 20;
export const COMMAND_KEY_DATA_RESET_RELAYS: number = 21;
