import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {faBluetooth, faBluetoothB} from '@fortawesome/free-brands-svg-icons'
import {faGear, faHome, faPlug} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {useNavigation} from "@react-navigation/native";
import {PAGE_BLUETOOTH_CONFIG, PAGE_HOME} from "././Pages";
import {BluetoothManagerContext} from "../context/BluetoothManagerContext.tsx";

interface ApplicationHeaderProps {
}

const PageHeader = (props: ApplicationHeaderProps) => {
    let navigation = useNavigation();
    const {isDeviceConnected, reconnectDevice, disconnectDevice, connectedDevice} = useContext(BluetoothManagerContext);

    const handleGearIconClick = () => {
        navigation.navigate(PAGE_BLUETOOTH_CONFIG);
    }
    const handleHomeIconClick = () => {
        navigation.navigate(PAGE_HOME);
    }
    const handleBluetoothIconClick = () => {
        if(!isDeviceConnected(undefined)){
            reconnectDevice();
        }else{
            disconnectDevice(connectedDevice);
        }
    }

    return <View
        style={{
            backgroundColor: '#FF4443',
            padding: 10,
            flexDirection: 'row',
            justifyContent: "space-between",
            gap: 10,
            alignItems: "center"
        }}>
        <View>
            <TouchableOpacity onPress={handleHomeIconClick}>
                <FontAwesomeIcon color={"#FFFFFF"} icon={faHome} size={24}/>
            </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
            <Text style={{color: "#FFFFFF", fontSize: 18, textAlign : 'center'}}>AVARE YOLCULAR</Text>
        </View>
        <View>
            <TouchableOpacity onPress={handleBluetoothIconClick}>
                {!isDeviceConnected(undefined) ? <FontAwesomeIcon color={"#444444"} icon={faPlug} size={24}/> :  <FontAwesomeIcon size={24} color={"#FFFFFF"} icon={faBluetoothB}/>}
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={handleGearIconClick}>
                <FontAwesomeIcon color={"#FFFFFF"} size={24} icon={faGear}/>
            </TouchableOpacity>
        </View>
    </View>
};
export default PageHeader;