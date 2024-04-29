import React, {useContext, useEffect} from 'react';
import {Button, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {PAGE_HOME} from "../Pages.ts";
import RelayButtons from "./RelayButtons.tsx";
import {BluetoothManagerContext} from "../../context/BluetoothManagerContext.tsx";

interface HomePageProps {
}

const HomePage = (props: HomePageProps) => {
    let navigation = useNavigation();
    const {initBluetoothDevice} = useContext(BluetoothManagerContext);
    useEffect(() => {
        initBluetoothDevice().then(()=>{});
    }, []);

    return <View style={{padding : 10}}>
        <RelayButtons/>
    </View>
};
export default HomePage;