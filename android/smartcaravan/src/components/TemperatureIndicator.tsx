import React from 'react';
import {Text, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faTemperatureThreeQuarters} from "@fortawesome/free-solid-svg-icons";

interface TemperatureIndicatorProps {
    value: number;
}

const TemperatureIndicator = (props: TemperatureIndicatorProps) => {
    return <View style={{display : "flex", flexDirection : "row"}}>
        <View style={{width : 100, height : 100}}>
            <View style={{backgroundColor : "#FFFFFF"}}>
            </View>
            <View style={{backgroundColor : "#FFFFFF", }}>
            </View>
        </View>
        <View>
            <Text style={{color : "#FFFFFF"}}>Sıcaklık</Text>
            <Text style={{color : "#FFFFFF"}}>{props.value}</Text>
        </View>
    </View>
};
export default TemperatureIndicator;