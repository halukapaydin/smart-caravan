import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BluetoothManagerContext} from "../context/BluetoothManagerContext.tsx";

interface BatteryIconProps {
    width: number,
    height: number
}

const Style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    head: {
        borderWidth: 2,
        borderColor: "#FFFFFF",
        backgroundColor: "#FFFFFF",
        width: "30%",
        height: "5%",
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,

    },
    body: {
        borderWidth: 2,
        borderColor: "#FFFFFF",
        flex: 1,
        width: "100%",
        borderRadius: 5,
        display: "flex",
        justifyContent: "flex-end",
        padding: 5
    },
    indicator: {
        backgroundColor: "#d99754"
    },
    label: {
        position: "absolute",
        textAlign: "center",
        left: 0,
        right: 0,
        bottom: "30%",
        color: "#FFFFFF",
    }
})

const BatteryIcon = (props: BatteryIconProps) => {
    const {sensorsData, dataUpdateTime, readAllValues} = useContext(BluetoothManagerContext);
    const value = sensorsData.getBatteryVoltage();
    const {width = 50, height = 100} = props;
    let percent = calculatePercent(value);
    return <TouchableOpacity onPress={readAllValues}>
        <View style={[Style.container, {width: width, height: height}]}>
            <View style={[Style.head]}>
            </View>
            <View style={[Style.body]}>
                <View style={[Style.indicator, {height: `${percent}%`}]}>
                </View>
                <Text style={[Style.label]}>{value / 10}V</Text>
            </View>
        </View>
    </TouchableOpacity>
};

const calculatePercent = (value: number) => {
    if(value <= 100){
        return 0;
    }else if(value <= 120){
        return 10;
    }else if(value <= 125){
        return 20;
    }else if(value <= 128){
        return 30;
    }else if(value <= 129){
        return 40;
    }else if(value <= 130){
        return 50;
    }else if(value <= 131){
        return 60;
    }else if(value <= 132){
        return 70;
    }else if(value <= 133){
        return 80;
    }else if(value <= 134){
        return 90;
    }else if(value <= 136){
        return 100;
    }
    return 100;
}

export default BatteryIcon;