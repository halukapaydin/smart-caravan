import React, {useContext} from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import {BluetoothManagerContext} from "../context/BluetoothManagerContext.tsx";

interface ThermometerProps {
    width: number;
    height: number;
}

const Humidity = (props: ThermometerProps) => {
    const {sensorsData, dataUpdateTime, sendCommand} = useContext(BluetoothManagerContext);
    const value = sensorsData.getHumidityValue();
    return (
        <TouchableOpacity onPress={()=>{
            sendCommand("PRINT_TEMP");
        }}>
            <View style={{
                width: props.width,
                height: props.height,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Image style={{width: "70%", height: "60%"}} source={require("../../assets/humidity.png")}/>
                <View style={{alignItems: "center"}}>
                    <Text style={{color: "#FFFFFF"}}>Nem</Text>
                    <Text style={{color: "#FFFFFF"}}>{value} C</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default Humidity;