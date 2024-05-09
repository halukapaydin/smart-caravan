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

        Object.keys(PermissionsAndroid.PERMISSIONS).forEach(e=>{
            console.log(e);
        })
        console.log("----------------------------")

        try {
            for (const permission of PERMISSIONS) {
                try{
                    const g = await PermissionsAndroid.request(permission);
                    console.log( permission + " state is " + g);
                }catch (e){
                    console.log('Error requesting location permission:', e);
                }
            }

        } catch (error) {
            console.log('Error requesting location permission:', error);
        }
    }
};

// @ts-ignore
export const convertPeripheralToBluetoothDevice = (peripheral:Peripheral|any)=>{
    let device = new BluetoothDevice(
        peripheral.name,
        peripheral.id,
        peripheral.rssi,
        peripheral.connected,
        peripheral.serviceUUIDs
    );
    return device;
}


export const parseBluetoothData = (data:any)=>{
    console.log("parse data", data);
    return new SensorValues();
}


export const SERVICE_UUID:string = "ffe0";
export const CHARACTERISTIC_UUID:string = "ffe1";

