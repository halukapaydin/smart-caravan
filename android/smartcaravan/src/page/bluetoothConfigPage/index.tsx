import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import BluetoothDevice from "../../model/BluetoothDevice.ts";
import BluetoothDeviceList from "./BluetoothDeviceList.tsx";
import BluetoothScanButton from "./BluetoothScanButton.tsx";
import {BluetoothManagerContext} from "../../context/BluetoothManagerContext.tsx";
import {COLOR_BACKGROUND} from "../../util/BluetoothUtil.ts";

interface BluetoothConfigPageProps {
}

export default (props: BluetoothConfigPageProps) => {
    const {discoveredDevices,
        scanStart, scanStop, scanning, initBluetoothDevice,
        isScreenLandscape

    } = useContext(BluetoothManagerContext);
    const handleScanClick = () => {
        if(scanning){
            scanStop();
        }else{
            scanStart();
        }

    }
    useEffect(() => {
        initBluetoothDevice()
            .then(()=>{});

        return () => {
            scanStop();
        }
    }, []);


    return <View style={{gap: 20, display: 'flex', flex: 1}}>
        <BluetoothScanButton onPress={handleScanClick}/>
        <View style={{display : 'flex', flexDirection :  (isScreenLandscape() ? 'row' : 'column')}}>
            <View>
                <Text style={[Styles.deviceTitle]}>Kullanılabilir Cihazlar</Text>
                <BluetoothDeviceList data={discoveredDevices} />
            </View>
        </View>

    </View>;
}


const Styles = StyleSheet.create({
    deviceTitle: {
        fontWeight: 'bold', textAlign: 'center', fontSize: 16,
        color : "#FFFFFF"
    },
    listContainer: {
        flex: 1
    }
})