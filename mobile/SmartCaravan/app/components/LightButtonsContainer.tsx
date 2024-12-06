import {
    faBars,
    faBed,
    faCouch
} from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import LightButton from './LightButton';
interface LightButtonsContainerProps { }

const LightButtonsContainer = (props: LightButtonsContainerProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.lineContainer}>
                <View style={styles.item}>
                    <LightButton icon={faBars} label='"Test1' onPress={() => { }} selected={false} />
                </View>
                <View style={styles.item}>
                    <LightButton icon={faBed} label='"Test2' onPress={() => { }} selected={true} />
                </View>
                <View style={styles.item}>
                    <LightButton icon={faCouch} label='"Test3' onPress={() => { }} selected={false} />
                </View>
            </View>
            <View style={styles.lineContainer}>
                <View style={styles.item}>
                    <LightButton icon={faBars} label='"Test1' onPress={() => { }} selected={false} />
                </View>
                <View style={styles.item}>
                    <LightButton icon={faBed} label='"Test2' onPress={() => { }} selected={true} />
                </View>
                <View style={styles.item}>
                    <LightButton icon={faCouch} label='"Test3' onPress={() => { }} selected={false} />
                </View>
            </View>
            <View style={styles.lineContainer}>
                <View style={styles.item}>
                    <LightButton icon={faBars} label='"Test1' onPress={() => { }} selected={false} />
                </View>
                <View style={styles.item}>
                    <LightButton icon={faBed} label='"Test2' onPress={() => { }} selected={true} />
                </View>
                <View style={styles.item}>
                    <LightButton icon={faCouch} label='"Test3' onPress={() => { }} selected={false} />
                </View>
            </View>
            <View style={styles.lineContainer}>
                <View style={styles.item}>
                    <LightButton icon={faBars} label='"Test1' onPress={() => { }} selected={false} />
                </View>
                <View style={styles.item}>
                    <LightButton icon={faBed} label='"Test2' onPress={() => { }} selected={true} />
                </View>
                <View style={styles.item}>
                    <LightButton icon={faCouch} label='"Test3' onPress={() => { }} selected={false} />
                </View>
            </View>

        </View>
    );
};

export default LightButtonsContainer;

const styles = StyleSheet.create({
    container : {
        flexDirection: 'column',
        gap : 10
    },
    lineContainer: {
        flexDirection: 'row',
        width: '100%',
        gap: 10,
        height : 'auto'
    },
    item: {
        flex: 1,
    }
});
