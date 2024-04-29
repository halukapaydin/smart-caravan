import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import BluetoothDevice from "../../model/BluetoothDevice.ts";
import BluetoothDeviceList from "./BluetoothDeviceList.tsx";
import BluetoothScanButton from "./BluetoothScanButton.tsx";
import {BluetoothManagerContext} from "../../context/BluetoothManagerContext.tsx";

interface BluetoothConfigPageProps {
}

export default (props: BluetoothConfigPageProps) => {
    const {fetchPairedDevices, pairedDevices, discoveredDevices, scanStart, scanStop, scanning, initBluetoothDevice } = useContext(BluetoothManagerContext);
    const handleScanClick = () => {
        if(scanning){
            scanStop();
        }else{
            scanStart();
        }

    }
    useEffect(() => {
        initBluetoothDevice().then(()=>{
            fetchPairedDevices();
        });

        return () => {
            scanStop();
        }
    }, []);


    return <View style={{gap: 20, display: 'flex', flex: 1}}>
        <BluetoothScanButton onPress={handleScanClick}/>
        <Text style={[Styles.deviceTitle]}>Eşleşen Cihazlar</Text>
        <BluetoothDeviceList data={pairedDevices} />
        <Text style={[Styles.deviceTitle]}>Kullanılabilir Cihazlar</Text>
        <BluetoothDeviceList data={discoveredDevices} />
    </View>;
}


const Styles = StyleSheet.create({
    deviceTitle: {
        fontWeight: 'bold', textAlign: 'center', fontSize: 16,
        color : '#000000'
    },
    listContainer: {
        flex: 1
    }
})