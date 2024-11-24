import { PermissionsAndroid, Platform } from "react-native";
import { Peripheral, PeripheralInfo } from "react-native-ble-manager";
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
        peripheral.connected
    );
    return device;
}
// @ts-ignore
export const convertPeripheralInfoToBluetoothDevice = (peripheral: PeripheralInfo | any) => {
    let _service = undefined;
    let _characteristic = undefined;
    for (const serviceUUID of peripheral.advertising.serviceUUIDs) {
        for (const characteristic of peripheral.characteristics) {
            if (characteristic.service === serviceUUID) {
                _service = serviceUUID;
                _characteristic = characteristic.characteristic;
            }
        }
    }

    let device = new BluetoothDevice(
        peripheral.name,
        peripheral.id,
        peripheral.rssi,
        peripheral.connected,
        _service,
        _characteristic
    );
    return device;
}

const setData = (data: string, sensorValues: SensorValues) => {
    let [key, value] = data.split(":");
    switch (key) {
        case "R1":
            sensorValues.setButtonValue(1, parseInt(value));
            break;
        case "R2":
            sensorValues.setButtonValue(2, parseInt(value))
            break;
        case "R3":
            sensorValues.setButtonValue(3, parseInt(value))
            break;
        case "R4":
            sensorValues.setButtonValue(4, parseInt(value))
            break;
        case "R5":
            sensorValues.setButtonValue(5, parseInt(value))
            break;
        case "R6":
            sensorValues.setButtonValue(6, parseInt(value))
            break;
        case "R7":
            sensorValues.setButtonValue(7, parseInt(value))
            break;
        case "R8":
            sensorValues.setButtonValue(8, parseInt(value))
            break;
        case "R9":
            sensorValues.setButtonValue(9, parseInt(value))
            break;
        case "R10":
            sensorValues.setButtonValue(10, parseInt(value))
            break;
        case "HMD":
            sensorValues.setHumidityValue(parseInt(value));
            break;
        case "TEMP":
            sensorValues.setTemperatureValue(parseInt(value));
            break;
        case "WLP_C":
            sensorValues.setCleanWaterLevel(parseInt(value));
            break;
        case "WLP_G":
            sensorValues.setGrayWaterLevel(parseInt(value));
            break;
        case "WLP_B":
            sensorValues.setBlackWaterLevel(parseInt(value));
            break;
        case "WLV_C":
            sensorValues.setCleanWaterValue(parseInt(value));
            break;
        case "WLV_G":
            sensorValues.setGrayWaterValue(parseInt(value));
            break;
        case "WLV_B":
            sensorValues.setBlackWaterValue(parseInt(value));
            break;
        case "AIRQL":
            sensorValues.setAirQualityLevel(parseInt(value));
            break;
        case "AIRQV":
            sensorValues.setAirQualityValue(parseFloat(value));
            break;
        case "GASL":
            sensorValues.setGasLevel(parseInt(value));
            break;
        case "GASV":
            sensorValues.setGasValue(parseFloat(value));
            break;
        case "VOL":
            sensorValues.setBatteryVoltage(parseFloat(value));
            break;

    }
}
export const parseBluetoothData = (numberData: number[], sensorValue: SensorValues) => {
    //let data = Buffer.from(numberData).toString();
    let data = "";
    numberData?.forEach(element => {
        data += String.fromCharCode(element);
    });
    console.log("received value : ", numberData, data);
    let parts = data.split(";");
    for (const part of parts) {
        if (!part || part.length === 0) {
            continue;
        }
        setData(part, sensorValue);
    }
    // console.log("parse data", data, sensorValue);
    return sensorValue;
}


export const COLOR_WHITE = "#FFFFFF";
export const COLOR_PRIMARY = "#3b3b3b";
export const COLOR_SECONDARY = "#232323";
export const COLOR_BACKGROUND = "#252525";
export const COLOR_DISABLED = "#5e90ff";
export const COLOR_SCAN_BUTTON = "#5e90ff";
export const COLOR_HIGHLIGHT = "#ffff00";

export const SERVICE_UUID: string = "ffe0";
export const CHARACTERISTIC_UUID: string = "ffe1";
export const COMMAND_RESET_RELAYS: string = "RELAYS_RESET";
export const COMMAND_PRINT_ALL: string = "PRINT_ALL";
export const COMMAND_RELAY_OFF: string = "RELAY_OFF:";
export const COMMAND_RELAY_ON: string = "RELAY_ON:";



