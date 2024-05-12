import React, {useContext} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import {faGear, faHandshake, faHandshakeSlash, faHome, faTruckLoading} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {useNavigation} from "@react-navigation/native";
import {PAGE_BLUETOOTH_CONFIG, PAGE_HOME} from "././Pages";
import {BluetoothManagerContext} from "../context/BluetoothManagerContext.tsx";
import {COLOR_BACKGROUND, COLOR_HIGHLIGHT, COLOR_SECONDARY} from "../util/BluetoothUtil.ts";

interface ApplicationHeaderProps {
}

const PageHeader = (props: ApplicationHeaderProps) => {
    let navigation = useNavigation();
    const {isDeviceConnected, reconnectDevice, disconnectDevice
        , connectedDevice, connecting, readAllValues} = useContext(BluetoothManagerContext);

    const handleGearIconClick = () => {
        navigation.navigate(PAGE_BLUETOOTH_CONFIG);
    }
    const handleHomeIconClick = () => {
        navigation.navigate(PAGE_HOME);
    }
    const handleBluetoothIconClick = () => {
        if (!isDeviceConnected(undefined)) {
            reconnectDevice();
        } else {
            disconnectDevice(connectedDevice);
        }
    }
    let iconBluetooth = undefined;
    if(connecting){
        iconBluetooth = <ActivityIndicator />
    }else if (isDeviceConnected(undefined)) {
        iconBluetooth = <FontAwesomeIcon size={30} color={COLOR_HIGHLIGHT} icon={faHandshake}/>
    } else {
        iconBluetooth = <FontAwesomeIcon size={30} color={"#FFFFFF"} icon={faHandshakeSlash}/>
    }

    return <View
        style={{
            backgroundColor: COLOR_BACKGROUND,
            padding: 10,
            flexDirection: 'row',
            justifyContent: "space-between",
            gap: 10,
            alignItems: "center"
        }}>
        <View>
            <TouchableOpacity onPress={handleHomeIconClick}>
                <FontAwesomeIcon color={"#FFFFFF"} icon={faHome} size={30}/>
            </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
            <Text style={{color: "#FFFFFF", fontSize: 20, textAlign: 'center'}}>AVARE YOLCULAR</Text>
        </View>
        <View>
            <TouchableOpacity onPress={handleBluetoothIconClick}>
                {iconBluetooth}
            </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity onPress={handleGearIconClick}>
                <FontAwesomeIcon color={"#FFFFFF"} size={30} icon={faGear}/>
            </TouchableOpacity>
        </View>
    </View>
};
export default PageHeader;