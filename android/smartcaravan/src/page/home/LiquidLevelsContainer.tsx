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
        justifyContent : "space-between",
        alignItems : 'center',
        alignContent : "center",
        alignSelf : "center",
        padding : 10
    }
})

const LiquidLevelsContainer = (props: LiquidLevelsContainerProps) => {
    const {sensorsData, dataUpdateTime} = useContext(BluetoothManagerContext);
    return <View style={[Styles.container]}>
        <LiquidLevelIndicator value={sensorsData?.getCleanWaterLevel()} size={100} label={"Temiz Su"} color={"#1b94d7"}/>
        <LiquidLevelIndicator value={sensorsData?.getGrayWaterLevel()} size={100} label={"Gri Su"} color={"#2a869b"}/>
        <LiquidLevelIndicator value={sensorsData?.getBlackWaterLevel()} size={100} label={"Siyah su"} color={"#c8869b"}/>
    </View>
};
export default LiquidLevelsContainer;