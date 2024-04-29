// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-native/no-inline-styles */
//
// import React, {useEffect, useState} from 'react';
// import {
//     Alert,
//     FlatList,
//     NativeEventEmitter,
//     NativeModules,
//     PermissionsAndroid,
//     Platform,
//     SafeAreaView, ScrollView,
//     StatusBar,
//     Text,
//     TouchableOpacity,
//     useColorScheme,
//     View,
// } from 'react-native';
// import {styles} from './styles.tsx';
// import {DeviceList} from './DeviceList.tsx';
// import BleManager, {BleScanCallbackType, BleScanMode, BleScanPhyMode} from 'react-native-ble-manager';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
//
// const BleManagerModule = NativeModules.BleManager;
// const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);
//
// const App = () => {
//     const peripherals = new Map();
//     const [isScanning, setIsScanning] = useState(false);
//     const [connectedDevices, setConnectedDevices] = useState([]);
//     const [discoveredDevices, setDiscoveredDevices] = useState([]);
//
//     const handleLocationPermission = async () => {
//         if (Platform.OS === 'android' && Platform.Version >= 23) {
//             try {
//                 const g1 = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
//                 console.log("g", g1);
//                 const g2 = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
//                 console.log("g", g2);
//                 const g3 = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE);
//                 console.log("g", g3);
//                 const g4 = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
//                 console.log("g", g4);
//
//             } catch (error) {
//                 console.log('Error requesting location permission:', error);
//             }
//         }
//     };
//
//     const handleGetConnectedDevices = () => {
//         BleManager.getBondedPeripherals([]).then(results => {
//             for (let i = 0; i < results.length; i++) {
//                 let peripheral = results[i];
//                 peripheral.connected = true;
//                 peripherals.set(peripheral.id, peripheral);
//                 setConnectedDevices(Array.from(peripherals.values()));
//             }
//         });
//     };
//
//     useEffect(() => {
//         handleLocationPermission().then(()=>{
//             BleManager.enableBluetooth();
//         });
//
//
//         BleManager.start({}).then(() => {
//             console.log('BleManager initialized');
//             handleGetConnectedDevices();
//         });
//
//         let stopDiscoverListener = BleManagerEmitter.addListener(
//             'BleManagerDiscoverPeripheral',
//             peripheral => {
//                 if(!!peripheral.id){
//                     console.log("BleManagerDiscoverPeripheral", peripheral);
//                 }
//                 peripherals.set(peripheral.id, peripheral);
//                 setDiscoveredDevices(Array.from(peripherals.values()));
//             },
//         );
//
//         let stopConnectListener = BleManagerEmitter.addListener(
//             'BleManagerConnectPeripheral',
//             peripheral => {
//                 console.log('BleManagerConnectPeripheral:', peripheral);
//             },
//         );
//
//         let stopScanListener = BleManagerEmitter.addListener(
//             'BleManagerStopScan',
//             () => {
//                 setIsScanning(false);
//                 console.log('scan stopped');
//             },
//         );
//
//         return () => {
//             stopDiscoverListener.remove();
//             stopConnectListener.remove();
//             stopScanListener.remove();
//         };
//     }, []);
//
//     const scan = () => {
//         if (!isScanning) {
//             BleManager.scan([], 5, false)
//                 .then(() => {
//                     console.log('Scanning...');
//                     setIsScanning(true);
//                 })
//                 .catch(error => {
//                     console.error(error);
//                 });
//         }
//     };
//
//     const connect = peripheral => {
//         BleManager.createBond(peripheral.id)
//             .then(() => {
//                 peripheral.connected = true;
//                 peripherals.set(peripheral.id, peripheral);
//                 let devices = Array.from(peripherals.values());
//                 setConnectedDevices(Array.from(devices));
//                 setDiscoveredDevices(Array.from(devices));
//                 console.log('BLE device paired successfully');
//             })
//             .catch(() => {
//                 throw Error('failed to bond');
//             });
//     };
//
//     const disconnect = peripheral => {
//         BleManager.removeBond(peripheral.id)
//             .then(() => {
//                 peripheral.connected = false;
//                 peripherals.set(peripheral.id, peripheral);
//                 let devices = Array.from(peripherals.values());
//                 setConnectedDevices(Array.from(devices));
//                 setDiscoveredDevices(Array.from(devices));
//                 Alert.alert(`Disconnected from ${peripheral.name}`);
//             })
//             .catch(() => {
//                 throw Error('fail to remove the bond');
//             });
//     };
//
//     const isDarkMode = useColorScheme() === 'dark';
//     const backgroundStyle = {
//         backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//     };
//
//     return (
//         <SafeAreaView style={[backgroundStyle, styles.container]}>
//             <StatusBar
//                 barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//                 backgroundColor={backgroundStyle.backgroundColor}
//             />
//             <View style={{pdadingHorizontal: 20}}>
//                 <Text
//                     style={[
//                         styles.title,
//                         {color: isDarkMode ? Colors.white : Colors.black},
//                     ]}>
//                     React Native BLE Manager Tutorial
//                 </Text>
//                 <TouchableOpacity
//                     onPress={scan}
//                     activeOpacity={0.5}
//                     style={styles.scanButton}>
//                     <Text style={styles.scanButtonText}>
//                         {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}
//                     </Text>
//                 </TouchableOpacity>
//
//                 <Text
//                     style={[
//                         styles.subtitle,
//                         {color: isDarkMode ? Colors.white : Colors.black},
//                     ]}>
//                     Discovered Devices:
//                 </Text>
//                 {discoveredDevices.length > 0 ? (
//                     <FlatList
//                         data={discoveredDevices}
//                         renderItem={({item}) => (
//                             <DeviceList
//                                 peripheral={item}
//                                 connect={connect}
//                                 disconnect={disconnect}
//                             />
//                         )}
//                         keyExtractor={item => item.id}
//                     />
//                 ) : (
//                     <Text style={styles.noDevicesText}>No Bluetooth devices found</Text>
//                 )}
//
//                 {/*<Text*/}
//                 {/*    style={[*/}
//                 {/*        styles.subtitle,*/}
//                 {/*        {color: isDarkMode ? Colors.white : Colors.black},*/}
//                 {/*    ]}>*/}
//                 {/*    Connected Devices:*/}
//                 {/*</Text>*/}
//                 {/*{connectedDevices.length > 0 ? (*/}
//                 {/*    <FlatList*/}
//                 {/*        data={connectedDevices}*/}
//                 {/*        renderItem={({item}) => (*/}
//                 {/*            <DeviceList*/}
//                 {/*                peripheral={item}*/}
//                 {/*                connect={connect}*/}
//                 {/*                disconnect={disconnect}*/}
//                 {/*            />*/}
//                 {/*        )}*/}
//                 {/*        keyExtractor={item => item.id}*/}
//                 {/*    />*/}
//                 {/*) : (*/}
//                 {/*    <Text style={styles.noDevicesText}>No connected devices</Text>*/}
//                 {/*)}*/}
//             </View>
//         </SafeAreaView>
//     );
// };
//
// export default App;