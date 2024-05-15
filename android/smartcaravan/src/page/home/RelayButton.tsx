import React, {useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {BluetoothManagerContext} from "../../context/BluetoothManagerContext.tsx";
import {COLOR_BACKGROUND, COLOR_HIGHLIGHT, COLOR_PRIMARY, COLOR_SECONDARY} from "../../util/BluetoothUtil.ts";

interface RelayButtonProps {
    relayId : number;
}

const RelayButton = (props: RelayButtonProps) => {
    const [value, setValue] = useState(0);
    const {dataUpdateTime, sensorsData, sendCommand} = useContext(BluetoothManagerContext);

    useEffect(() => {
        setValue(sensorsData.getButtonValue(props.relayId))
    }, []);

    useEffect(() => {
        return () => {
            setValue(sensorsData.getButtonValue(props.relayId))
        };
    }, [dataUpdateTime]);

    const handleOnClick = ()=>{
        sendCommand(props.relayId);
    }

    return <TouchableOpacity style={{backgroundColor : COLOR_BACKGROUND, flex : 1, borderRadius : 5}} onPress={handleOnClick}>
        <View style={{backgroundColor : COLOR_PRIMARY, paddingTop : 20, paddingBottom : 0, borderRadius : 10, gap : 5}}>
            <Text style={{color : '#FFFFFF', textAlign : "center"}} numberOfLines={1}>Relay {props.relayId}</Text>
            <View style={{paddingHorizontal : 10, paddingVertical : 10}}>
                <View style={{height : 3, backgroundColor : (value === 1 ? COLOR_HIGHLIGHT : COLOR_SECONDARY)}}></View>
            </View>
        </View>
    </TouchableOpacity>
};
export default RelayButton;