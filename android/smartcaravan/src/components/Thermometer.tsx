import React from 'react';
import {Image, Text, View} from "react-native";

interface ThermometerProps {
    width: number;
    height: number;
    value : number;
}

const Thermometer = (props: ThermometerProps) => {
    return (
        <View style={{width: props.width, height: props.height, display: "flex", flexDirection: "column", alignItems: "center", justifyContent : "space-between"}}>
            <Image style={{width: "70%", height: "70%"}} source={require("../../assets/thermometer.png")}/>
            <View style={{alignItems : "center"}}>
                <Text style={{color: "#FFFFFF"}}>Sıcaklık</Text>
                <Text style={{color: "#FFFFFF"}}>{props.value} C</Text>
            </View>
        </View>
    );
};
export default Thermometer;