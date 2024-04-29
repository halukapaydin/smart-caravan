// import {NativeEventEmitter, NativeModules} from "react-native";
// import {convertPeripheralToBluetoothDevice, grantBluetoothPermissions} from "../util/BluetoothUtil.ts";
// import BluetoothDevice from "../model/BluetoothDevice.ts";
// import BleManager, {Peripheral} from 'react-native-ble-manager';
// import {EmitterSubscription} from "react-native/Libraries/vendor/emitter/EventEmitter";
// import {Dispatch} from "react";
//
// const BleManagerModule = NativeModules.BleManager;
//
// export class BluetoothManager {
//
//     private _bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
//     private _onDeviceDiscovered: Dispatch<BluetoothDevice> | null = null;
//     private _onScanStop: Dispatch<void> | null = null;
//
//     private _discoverListener: EmitterSubscription | null = null;
//     private _stopScanListener: EmitterSubscription | null = null;
//
//     constructor() {
//     }
//
//
//     async start() {
//         await grantBluetoothPermissions();
//
//         await BleManager.enableBluetooth();
//
//         this._discoverListener = this._bleManagerEmitter.addListener(
//             "BleManagerDiscoverPeripheral",
//             (peripheral: Peripheral) => {
//                 if (!peripheral.id || !peripheral.name) {
//                     return;
//                 }
//                 console.log("device found", peripheral);
//
//                 if (!!this._onDeviceDiscovered) {
//                     this._onDeviceDiscovered(convertPeripheralToBluetoothDevice(peripheral));
//                 }
//             }
//         );
//         this._stopScanListener = this._bleManagerEmitter.addListener(
//             'BleManagerStopScan',
//             () => {
//                 if (!!this._onScanStop) {
//                     this._onScanStop(undefined);
//                 }
//             },
//         );
//         await BleManager.start().then(() => {
//             console.log("started");
//         });
//     }
//
//     fetchPairedDevices(): Promise<BluetoothDevice[]> {
//         return new Promise((resolve, reject) => {
//             BleManager.getBondedPeripherals()
//                 .then(results => {
//                     console.log("paired devices fetched", results)
//                     const devices = results.map(p => convertPeripheralToBluetoothDevice(p))
//                     console.log("paired devices fetched2", devices);
//
//                     resolve(devices);
//                 }).catch(e => {
//                 reject(e);
//             })
//             ;
//         })
//     }
//
//     scanStart(): void {
//         BleManager.scan([], 15, false)
//             .then(() => {
//                 console.log("Scan started")
//             })
//     }
//
//     scanStop() {
//         BleManager.stopScan().then(()=>{
//             console.log("Scan stopped")
//         });
//     }
//
//     onDeviceDiscovered(dispatch: Dispatch<BluetoothDevice>) {
//         this._onDeviceDiscovered = dispatch;
//     }
//
//     onScanStop(dispatch: Dispatch<void>) {
//         this._onScanStop = dispatch;
//     }
//
//     connect(device:BluetoothDevice):Promise<void>{
//         return BleManager.connect(device.id);
//     }
//
//     disconnect(device:BluetoothDevice):Promise<void>{
//         return BleManager.disconnect(device.id);
//     }booleanPromise
//
//     isDeviceConnected(device:BluetoothDevice):boolean{
//         return BleManager.isPeripheralConnected(device.id);
//     }
//
//     close() {
//         if (this._discoverListener) {
//             this._discoverListener.remove();
//         }
//         if (this._stopScanListener) {
//             this._stopScanListener.remove();
//         }
//     }
// }
//
// const BLUETOOTH_MANAGER = new BluetoothManager();
// export default BLUETOOTH_MANAGER;
//
