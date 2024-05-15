import React from 'react';
import BatteryIcon from "../../components/BatteryIcon.tsx";
import Thermometer from "../../components/Thermometer.tsx";
import Humidity from "../../components/Humidity.tsx";
import {StyleSheet, View} from "react-native";

interface SensorsContainerProps {
}

const Styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        // backgroundColor: "#FF4433",
        flex: 1,
        width : "100%"
    }
})

const SensorsContainer = (props: SensorsContainerProps) => {
    return <View style={[Styles.container]}>
        <BatteryIcon height={100} width={60}/>
        <Thermometer height={100} width={60}/>
        <Humidity height={100} width={60}/>
    </View>
};
export default SensorsContainer;