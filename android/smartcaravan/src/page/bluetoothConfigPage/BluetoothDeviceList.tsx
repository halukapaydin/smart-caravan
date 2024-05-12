import React, {Dispatch, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import BluetoothDevice from "../../model/BluetoothDevice.ts";
import {BluetoothManagerContext} from "../../context/BluetoothManagerContext.tsx";

interface BluetoothDeviceListProps {
    data: BluetoothDevice[];
}

const BluetoothDeviceList = (props: BluetoothDeviceListProps) => {
    const [data, setData] = useState(props.data);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    if (!data) {
        return <View><Text>No Data</Text></View>
    }

    return <View style={{gap: 3, paddingHorizontal: 5}}>
        {
            data?.map(d => {
                return <View key={d.id} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{fontSize: 16, color: '#FFFFFF'}}>{d.name}</Text>
                        <Text style={{fontSize: 10, color: '#FFFFFF'}}>{d.id}</Text>
                    </View>
                    <View>
                        <ConnectButton device={d}/>
                    </View>
                </View>
            })
        }
    </View>

};

const ConnectButton = ({device}: { device: BluetoothDevice}) => {
    const [innerConnecting, setInnerConnecting] = useState(false);
    const {
        connecting,
        isDeviceConnected,
        connectDevice,
        disconnectDevice
    } = useContext(BluetoothManagerContext);

    if(innerConnecting && !connecting){
        setInnerConnecting(false);
    }

    if (innerConnecting) {
        return <ActivityIndicator/>
    }

    const handleButtonClick = ()=>{
        if (isDeviceConnected(device)) {
            disconnectDevice(device);
        } else {
            setInnerConnecting(true);
            connectDevice(device);
        }
    }

    return <TouchableOpacity onPress={handleButtonClick} style={{backgroundColor: connecting ?  '#ffb5b5' : '#5b5b5b', borderRadius: 3}}>
        <Text style={{
            paddingHorizontal: 15,
            paddingVertical: 5,
            color: '#ffffff'
        }} disabled={connecting}>{isDeviceConnected(device) ? "Bağlantıyı kes" : "Bağlan"}</Text>
    </TouchableOpacity>


}

export default BluetoothDeviceList;