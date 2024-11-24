import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {BluetoothManagerContext} from "../../context/BluetoothManagerContext.tsx";
import {COLOR_BACKGROUND, COLOR_PRIMARY, COLOR_WHITE, COMMAND_RESET_RELAYS,} from "../../util/BluetoothUtil.ts";
import {RELAY_ATTRIBUTES_RESET_RELAYS} from "../../util/ButtonUtil.ts";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

interface RefreshButtonProps {
}

const RefreshButton = (props: RefreshButtonProps) => {
    const {sendCommand} = useContext(BluetoothManagerContext);

    const handleOnClick = () => {
        sendCommand(COMMAND_RESET_RELAYS);
    }

    const color = COLOR_WHITE;
    let relayAttr = RELAY_ATTRIBUTES_RESET_RELAYS;
    return <TouchableOpacity style={{backgroundColor: COLOR_BACKGROUND, flex: 1, borderRadius: 5}}
                             onPress={handleOnClick}>
        <View style={{backgroundColor: COLOR_PRIMARY, paddingTop: 20, paddingBottom: 0, borderRadius: 10, gap: 5}}>
            <View style={{alignItems: 'center'}}><FontAwesomeIcon color={color} icon={relayAttr?.icon}
                                                                  size={30}/></View>
            <Text style={{color: color, textAlign: "center", fontSize: 10}} numberOfLines={1}>{relayAttr?.label}</Text>
            <View style={{paddingHorizontal: 10, paddingTop: 5, paddingBottom: 10}}>
                <View style={{height: 3, backgroundColor: color}}></View>
            </View>
        </View>
    </TouchableOpacity>
};
export default RefreshButton;