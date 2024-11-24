import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import RelayButtons from "./RelayButtons.tsx";
import {BluetoothManagerContext} from "../../context/BluetoothManagerContext.tsx";
import {COLOR_BACKGROUND} from "../../util/BluetoothUtil.ts";
import LiquidLevelsContainer from "./LiquidLevelsContainer.tsx";
import SensorsContainer from "./SensorsContainer.tsx";
import Orientation from 'react-native-orientation-locker';

interface HomePageProps {
}

const Styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: COLOR_BACKGROUND,
        justifyContent: "space-evenly",
        flex: 1,
        display: "flex"
    },
    containerLandscape: {
        flexDirection: "row"
    },
    containerPortrait: {
        flexDirection: "column"
    }
})

const HomePage = (props: HomePageProps) => {
    const {
        readAllValues,
        initBluetoothDevice,
        sensorsData,
        connectedDevice,
        isScreenLandscape
    } = useContext(BluetoothManagerContext);
    useEffect(() => {
        if (!connectedDevice) {
            return;
        }
        readAllValues();
        return () => {
        }

    }, [connectedDevice]);

    const getStyle = ()=>{
        if (isScreenLandscape()) {
            return Styles.containerLandscape;
        } else {
            return Styles.containerPortrait;
        }
    }


    return <View style={[Styles.container, getStyle()]}>
        <View style={{flex: 1}}>
            <RelayButtons/>
        </View>
        <View style={{display: "flex", flexDirection: "column", gap: 10, flex: 1}}>
            <LiquidLevelsContainer/>
            <SensorsContainer/>
        </View>
    </View>
};
export default HomePage;