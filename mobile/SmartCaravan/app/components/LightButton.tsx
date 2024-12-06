import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getLightButtonActiveColor, getLightButtonBackgroundColor, getLightButtonPassiveColor } from "../config/ApplicationConfig";

interface LightButtonProps {
    onPress: React.DispatchWithoutAction,
    selected: boolean,
    icon: IconProp,
    label: string
}

const LightButton = (props: LightButtonProps) => {
    const color = props.selected ? getLightButtonActiveColor() : getLightButtonPassiveColor();
    return <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <View style={styles.innerContainer}>
            <View style={styles.iconContainer}><FontAwesomeIcon color={color} icon={props.icon} size={30} /></View>
            <Text style={{...styles.label, color : color}} numberOfLines={1}>{props.label}</Text>
            <View style={{ paddingHorizontal: 10, paddingTop: 5, paddingBottom: 10 }}>
                <View style={{ height: 3, backgroundColor: color }}></View>
            </View>
        </View>
    </TouchableOpacity>
};

export default LightButton;

const styles = StyleSheet.create({
    container: { 
        backgroundColor: getLightButtonBackgroundColor(), 
        borderRadius: 5, 
        width : '100%'
    },
    innerContainer: { 
        backgroundColor: getLightButtonBackgroundColor(), 
        paddingTop: 20, 
        paddingBottom: 0, 
        borderRadius: 10, 
        gap: 5 ,
        borderWidth : 2
    },
    iconContainer : {
        width : '100%',
        alignItems : 'center'
    },
    label: { textAlign: "center", fontSize: 10 }

});
