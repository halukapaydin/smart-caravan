import React, {useContext, useEffect} from 'react';
import {Button, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {PAGE_HOME} from "../Pages.ts";
import RelayButtons from "./RelayButtons.tsx";
import {BluetoothManagerContext} from "../../context/BluetoothManagerContext.tsx";
import {COLOR_BACKGROUND} from "../../util/BluetoothUtil.ts";
import LiquidLevelsContainer from "./LiquidLevelsContainer.tsx";
import BatteryIcon from "../../components/BatteryIcon.tsx";

interface HomePageProps {
}

const HomePage = (props: HomePageProps) => {
    let navigation = useNavigation();
    const {initBluetoothDevice} = useContext(BluetoothManagerContext);
    useEffect(() => {
        initBluetoothDevice().then(()=>{});
    }, []);

    return <View style={{padding : 10, backgroundColor : COLOR_BACKGROUND}}>
        <RelayButtons/>
        <LiquidLevelsContainer />
        <View >
            <BatteryIcon height={120} width={70} value={12.8}/>
        </View>
    </View>
};
export default HomePage;