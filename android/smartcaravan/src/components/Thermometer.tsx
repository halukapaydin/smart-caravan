import React, {useContext} from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import {BluetoothManagerContext} from "../context/BluetoothManagerContext.tsx";

interface ThermometerProps {
    width: number;
    height: number;
    value : number;
}

const Thermometer = (props: ThermometerProps) => {
    const {sensorsData, dataUpdateTime, readAllValues} = useContext(BluetoothManagerContext);
    const value = sensorsData.getTemperatureValue();
    return (
        <TouchableOpacity onPress={readAllValues}>
        <View style={{width: props.width, height: props.height, display: "flex", flexDirection: "column", alignItems: "center", justifyContent : "space-between"}}>
            <Image style={{width: "70%", height: "70%"}} source={require("../../assets/thermometer.png")}/>
            <View style={{alignItems : "center"}}>
                <Text style={{color: "#FFFFFF"}}>Sıcaklık</Text>
                <Text style={{color: "#FFFFFF"}}>{props.value} C</Text>
            </View>
        </View>
        </TouchableOpacity>
    );
};
export default Thermometer;