import React, {useContext} from 'react';
import {StyleSheet, View} from "react-native";
import LiquidLevelIndicator from "./LiquidLevelIndicator.tsx";
import {BluetoothManagerContext} from "../../context/BluetoothManagerContext.tsx";

interface LiquidLevelsContainerProps {
}
const Styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        gap : 10,
        justifyContent : "space-around",
        alignItems : 'center',
        alignContent : "center",
        alignSelf : "center",
        padding : 10,
        // backgroundColor : "#6523ef",
        width : "100%",
        flex : 1
    }
})

const LiquidLevelsContainer = (props: LiquidLevelsContainerProps) => {
    const {sensorsData, dataUpdateTime, sendCommand} = useContext(BluetoothManagerContext);
    return <View style={[Styles.container]}>
        <LiquidLevelIndicator value={sensorsData?.getCleanWaterValue()}  level={sensorsData?.getCleanWaterLevel()} 
        onClick={()=>{
            sendCommand("PRINT_WL_CLEAN");
        }}
        size={100} label={"Temiz Su"} color={"#1b94d7"}/>
        <LiquidLevelIndicator value={sensorsData?.getGrayWaterValue()} level={sensorsData?.getGrayWaterLevel()} 
        onClick={()=>{
            sendCommand("PRINT_WL_GRAY");
        }}
        size={100} label={"Gri Su"} color={"#2a869b"}/>
        <LiquidLevelIndicator value={sensorsData?.getBlackWaterValue()} level={sensorsData?.getBlackWaterLevel()} 
        onClick={()=>{
            sendCommand("PRINT_WL_BLACK");
        }}
        size={100} label={"Siyah su"} color={"#c8869b"}/>
    </View>
};
export default LiquidLevelsContainer;