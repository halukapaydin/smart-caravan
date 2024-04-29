// import React, {useEffect, useState} from 'react';
// import {
//   Text,
//   View,
//   NativeModules,
//   NativeEventEmitter,
//   Platform,
//   PermissionsAndroid,
//   Button,
// } from 'react-native';
//
// interface BluetoothConnectionScreenProps {}
//
// import BleManager, {
//   BleDisconnectPeripheralEvent,
//   BleManagerDidUpdateValueForCharacteristicEvent,
//   BleScanCallbackType,
//   BleScanMatchMode,
//   BleScanMode,
//   Peripheral,
// } from 'react-native-ble-manager';
//
// const SECONDS_TO_SCAN_FOR = 3;
// const SERVICE_UUIDS: string[] = [];
// const ALLOW_DUPLICATES = true;
//
// const BleManagerModule = NativeModules.BleManager;
// const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
//
// declare module 'react-native-ble-manager' {
//   // enrich local contract with custom state properties needed by App.tsx
//   interface Peripheral {
//     connected?: boolean;
//     connecting?: boolean;
//   }
// }
//
// const BluetoothConnectionScreen = (props: BluetoothConnectionScreenProps) => {
//   const [isScanning, setIsScanning] = useState(false);
//   const [peripherals, setPeripherals] = useState(
//     new Map<Peripheral['id'], Peripheral>(),
//   );
//
//   useEffect(() => {
//     try {
//       BleManager.start({showAlert: false})
//         .then(() => console.debug('BleManager started.'))
//         .catch((error: any) =>
//           console.error('BeManager could not be started.', error),
//         );
//     } catch (error) {
//       console.error('unexpected error starting BleManager.', error);
//       return;
//     }
//
//     const listeners = [
//       // bleManagerEmitter.addListener(
//       //     'BleManagerDiscoverPeripheral',
//       //     handleDiscoverPeripheral,
//       // ),
//       // bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan),
//       // bleManagerEmitter.addListener(
//       //     'BleManagerDisconnectPeripheral',
//       //     handleDisconnectedPeripheral,
//       // ),
//       // bleManagerEmitter.addListener(
//       //     'BleManagerDidUpdateValueForCharacteristic',
//       //     handleUpdateValueForCharacteristic,
//       // ),
//       // bleManagerEmitter.addListener(
//       //     'BleManagerConnectPeripheral',
//       //     handleConnectPeripheral,
//       // ),
//     ];
//     handleAndroidPermissions();
//   }, []);
//
//   const startScan = () => {
//     if (!isScanning) {
//       // reset found peripherals before scan
//       setPeripherals(new Map<Peripheral['id'], Peripheral>());
//
//       try {
//         console.debug('[startScan] starting scan...');
//         setIsScanning(true);
//         BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN_FOR, ALLOW_DUPLICATES, {
//           matchMode: BleScanMatchMode.Sticky,
//           scanMode: BleScanMode.LowLatency,
//           callbackType: BleScanCallbackType.AllMatches,
//         })
//           .then(() => {
//             console.debug('[startScan] scan promise returned successfully.');
//           })
//           .catch((err: any) => {
//             console.error('[startScan] ble scan returned in error', err);
//           });
//       } catch (error) {
//         console.error('[startScan] ble scan error thrown', error);
//       }
//     }
//   };
//
//   const startCompanionScan = () => {
//     try {
//       BleManager.companionScan(SERVICE_UUIDS)
//         .then((peripheral: Peripheral | null) => {
//           console.log(
//             '[startCompanionScan] scan promise returned successfully.',
//             peripheral,
//           );
//         })
//         .catch((err: any) => {
//           console.error('[startCompanionScan] ble scan cancel', err);
//         });
//     } catch (error) {
//       console.error('[startCompanionScan] ble scan error thrown', error);
//     }
//   };
//   const handleAndroidPermissions = () => {
//     if (Platform.OS === 'android' && Platform.Version >= 31) {
//       PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//       ]).then(result => {
//         if (result) {
//           console.debug(
//             '[handleAndroidPermissions] User accepts runtime permissions android 12+',
//           );
//         } else {
//           console.error(
//             '[handleAndroidPermissions] User refuses runtime permissions android 12+',
//           );
//         }
//       });
//     } else if (Platform.OS === 'android' && Platform.Version >= 23) {
//       PermissionsAndroid.check(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       ).then(checkResult => {
//         if (checkResult) {
//           console.debug(
//             '[handleAndroidPermissions] runtime permission Android <12 already OK',
//           );
//         } else {
//           PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           ).then(requestResult => {
//             if (requestResult) {
//               console.debug(
//                 '[handleAndroidPermissions] User accepts runtime permission android <12',
//               );
//             } else {
//               console.error(
//                 '[handleAndroidPermissions] User refuses runtime permission android <12',
//               );
//             }
//           });
//         }
//       });
//     }
//   };
//   return (
//     <View>
//       <Button
//         title={'Start Scan'}
//         onPress={() => {
//           startScan();
//         }}
//       />
//       <Button
//         title={'Start companion scan'}
//         onPress={() => {
//           startCompanionScan();
//         }}
//       />
//       <Text>ddddddddd</Text>
//     </View>
//   );
// };
// export default BluetoothConnectionScreen;
