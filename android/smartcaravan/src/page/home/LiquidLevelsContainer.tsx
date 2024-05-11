import React from 'react';
import {View} from "react-native";
import LiquidLevelIndicator from "./LiquidLevelIndicator.tsx";

interface LiquidLevelsContainerProps {
}

const LiquidLevelsContainer = (props: LiquidLevelsContainerProps) => {
    return <View style={{display : 'flex', flexDirection : 'row', flex : 1}}>
        <LiquidLevelIndicator value={0}/>
        <LiquidLevelIndicator value={35}/>
        <LiquidLevelIndicator value={100}/>
    </View>
};
export default LiquidLevelsContainer;