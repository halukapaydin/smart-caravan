import React, {useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import SensorsContext from "../../context/SensorsContext.tsx";

interface RelayButtonProps {
    relayId : number;
}

const RelayButton = (props: RelayButtonProps) => {
    const [value, setValue] = useState(0);
    const {dataUpdateTime, sensorsData} = useContext(SensorsContext);
    useEffect(() => {
        return () => {
            setValue(sensorsData.getButtonValue(props.relayId))
        };
    }, [dataUpdateTime]);

    return <TouchableOpacity style={{backgroundColor : '#343434', flex : 1}}>
        <View style={{backgroundColor : '#333333', padding : 10, borderRadius : 3}}>
            <Text style={{color : '#FFFFFF'}}>Relay {props.relayId} {value == 1 ? " *" : ""}</Text>
        </View>
    </TouchableOpacity>
};
export default RelayButton;