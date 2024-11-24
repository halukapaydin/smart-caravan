import React, {useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {BluetoothManagerContext} from "../../context/BluetoothManagerContext.tsx";
import {
    COLOR_BACKGROUND,
    COLOR_HIGHLIGHT,
    COLOR_PRIMARY,
    COLOR_SECONDARY,
    COLOR_WHITE,
    COMMAND_RELAY_ON,
    COMMAND_RELAY_OFF,
} from "../../util/BluetoothUtil.ts";
import {RELAY_ATTRIBUTES} from "../../util/ButtonUtil.ts";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

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
        setValue(sensorsData.getButtonValue(props.relayId))
        return () => {
            setValue(sensorsData.getButtonValue(props.relayId))
        };
    }, [dataUpdateTime]);

    const handleOnClick = ()=>{
        if(value === 1){
            sendCommand( COMMAND_RELAY_OFF +  props.relayId);
        }else{
            sendCommand( COMMAND_RELAY_ON +  props.relayId);
        }
    }
    const color = (value === 1 ? COLOR_HIGHLIGHT : COLOR_WHITE);

    let relayAttr = RELAY_ATTRIBUTES[props.relayId];
    return <TouchableOpacity style={{backgroundColor : COLOR_BACKGROUND, flex : 1, borderRadius : 5}} onPress={handleOnClick}>
        <View style={{backgroundColor : COLOR_PRIMARY, paddingTop : 20, paddingBottom : 0, borderRadius : 10, gap : 5}}>
            <View style={{alignItems : 'center'}}><FontAwesomeIcon color={color} icon={relayAttr?.icon} size={30}/></View>
            <Text style={{color : color, textAlign : "center", fontSize : 10}} numberOfLines={1}>{relayAttr?.label}</Text>
            <View style={{paddingHorizontal : 10, paddingTop : 5, paddingBottom : 10}}>
                <View style={{height : 3, backgroundColor : (value === 1 ? COLOR_HIGHLIGHT : COLOR_SECONDARY)}}></View>
            </View>
        </View>
    </TouchableOpacity>
};
export default RelayButton;