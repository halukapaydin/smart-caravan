import React, {useContext, useEffect} from 'react';
import {Button, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {PAGE_HOME} from "../Pages.ts";
import RelayButtons from "./RelayButtons.tsx";
import {BluetoothManagerContext} from "../../context/BluetoothManagerContext.tsx";
import {COLOR_BACKGROUND} from "../../util/BluetoothUtil.ts";
import LiquidLevelsContainer from "./LiquidLevelsContainer.tsx";
import BatteryIcon from "../../components/BatteryIcon.tsx";
import TemperatureIndicator from "../../components/TemperatureIndicator.tsx";
import Thermometer from "../../components/Thermometer.tsx";
import Humidity from "../../components/Humidity.tsx";
import relayButton from "./RelayButton.tsx";

interface HomePageProps {
}

const HomePage = (props: HomePageProps) => {
    const {readAllValues,initBluetoothDevice, sensorsData, connectedDevice, readHumidityAndTemperatureValue} = useContext(BluetoothManagerContext);
    useEffect(() => {
        readAllValues();
        return ()=>{
        }

    }, [connectedDevice]);

    return <View style={{padding : 10, backgroundColor : COLOR_BACKGROUND, justifyContent : "space-evenly", flex : 1}}>
        <RelayButtons/>
        <LiquidLevelsContainer />
        <View style={{display : "flex", flexDirection : "row", justifyContent : "space-around"}}>
            <BatteryIcon height={120} width={70} value={sensorsData?.getBatteryVoltage()}/>
            <Thermometer value={sensorsData?.getTemperatureValue()} height={120} width={70} />
            <Humidity value={sensorsData?.getHumidityValue()} height={120} width={70} />
        </View>
    </View>
};
export default HomePage;