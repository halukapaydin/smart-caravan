import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {BluetoothManagerContext} from "../context/BluetoothManagerContext.tsx";

interface BatteryIconProps {
    width: number,
    height: number,
    value: number
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
        display : "flex",
        justifyContent : "flex-end",
        padding : 5
    },
    indicator: {
        backgroundColor : "#d99754"
    },
    label: {
        position : "absolute",
        textAlign : "center",
        left : 0,
        right : 0,
        bottom : "30%",
        color : "#FFFFFF",
    }
})

const BatteryIcon = (props: BatteryIconProps) => {
    // const {sensorsData, dataUpdateTime} = useContext(BluetoothManagerContext);


        const {width = 50, height = 100, value = 0} = props;
    let percent = calculatePercent(value);
    return <View style={[Style.container, {width: width, height: height}]}>
        <View style={[Style.head]}>
        </View>
        <View style={[Style.body]}>
            <View style={[Style.indicator, {height : `${percent}%`}]}>
            </View>
            <Text style={[Style.label]}>{value}V</Text>
        </View>
    </View>
};

const calculatePercent = (value : number)=>{
    return 80;
}

export default BatteryIcon;