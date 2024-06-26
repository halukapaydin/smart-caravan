import React, {Dispatch, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BluetoothManagerContext} from "../../context/BluetoothManagerContext.tsx";
import {COLOR_HIGHLIGHT, COLOR_PRIMARY, COLOR_SCAN_BUTTON} from "../../util/BluetoothUtil.ts";
interface BluetoothScanButtonProps {
    onPress: Dispatch<void>,
}

const BluetoothScanButton = (props: BluetoothScanButtonProps) => {
    const {scanning} = useContext(BluetoothManagerContext);

    return <TouchableOpacity onPress={()=>props.onPress()} style={{padding : 5}}>
        <View style={Styles.scanButton}>
            <Text style={{color: '#FFFFFF'}}>{scanning ? "Stop Scan" : "Scan"}</Text>
            {
                scanning && <ActivityIndicator color="#00ff00"/>
            }
        </View>
    </TouchableOpacity>
};
const Styles = StyleSheet.create({
    scanButton: {
        backgroundColor: COLOR_PRIMARY,
        padding: 10,
        borderRadius : 3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5
    }
})
export default BluetoothScanButton;