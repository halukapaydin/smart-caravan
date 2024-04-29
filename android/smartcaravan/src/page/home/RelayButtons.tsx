import React, {useContext} from 'react';
import {StyleSheet, View} from "react-native";
import RelayButton from "./RelayButton.tsx";
import SensorsContext from "../../context/SensorsContext.tsx";

interface RelayButtonsProps {
}

const Styles = StyleSheet.create({
    container : {
        flexDirection : 'column',
        gap : 10
    },
    line : {
        flexDirection : 'row',
        gap : 10,
        justifyContent : "space-between",
        alignItems : 'center',
        alignContent : "center",
        alignSelf : "center"
    }
})
const RelayButtons = (props: RelayButtonsProps) => {

    return <View style={[Styles.container]}>
        <View style={[Styles.line]}>
            <RelayButton relayId={1}/>
            <RelayButton relayId={2}/>
            <RelayButton relayId={3}/>
            <RelayButton relayId={4}/>
        </View>
        <View style={[Styles.line]}>
            <RelayButton relayId={5}/>
            <RelayButton relayId={6}/>
            <RelayButton relayId={7}/>
            <RelayButton relayId={8}/>
        </View>
        <View style={[Styles.line]}>
            <RelayButton relayId={9}/>
            <RelayButton relayId={10}/>
            <RelayButton relayId={11}/>
            <RelayButton relayId={12}/>
        </View>
        <View style={[Styles.line]}>
            <RelayButton relayId={13}/>
            <RelayButton relayId={14}/>
            <RelayButton relayId={15}/>
            <RelayButton relayId={16}/>
        </View>
    </View>
};




export default RelayButtons;