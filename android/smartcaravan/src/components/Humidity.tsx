import React from 'react';
import {Image, Text, View} from "react-native";

interface ThermometerProps {
    width: number;
    height: number;
    value : number;
}

const Humidity = (props: ThermometerProps) => {
    return (
        <View style={{width: props.width, height: props.height, display: "flex", flexDirection: "column", alignItems: "center", justifyContent : "space-between"}}>
            <Image style={{width: "70%", height: "60%"}} source={require("../../assets/humidity.png")}/>
            <View style={{alignItems : "center"}}>
                <Text style={{color: "#FFFFFF"}}>Nem</Text>
                <Text style={{color: "#FFFFFF"}}>{props.value} C</Text>
            </View>
        </View>
    );
};
export default Humidity;