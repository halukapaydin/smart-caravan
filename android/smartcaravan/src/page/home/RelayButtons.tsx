import React, {useContext} from 'react';
import {StyleSheet, View} from "react-native";
import RelayButton from "./RelayButton.tsx";

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
            <RelayButton relayId={20}/>
            <RelayButton relayId={21}/>
        </View>
    </View>
};




export default RelayButtons;