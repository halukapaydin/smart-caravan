import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LiquidLevelIndicator from './LiquidLevelIndicator';
import { getLiquidLevelBlackWaterColor, getLiquidLevelBlackWaterText, getLiquidLevelCleanWaterColor, getLiquidLevelCleanWaterText, getLiquidLevelGrayWaterColor, getLiquidLevelGrayWaterText } from '../config/ApplicationConfig';

interface LiquidLevelIndicatorsContainerProps {}

const LiquidLevelIndicatorsContainer = (props: LiquidLevelIndicatorsContainerProps) => {
  return (
    <View style={styles.container}>
        <LiquidLevelIndicator color={getLiquidLevelCleanWaterColor()} label={getLiquidLevelCleanWaterText()} sensorValue={40} onClick={()=>{}} size={120} percentege={50}/>
        <LiquidLevelIndicator color={getLiquidLevelGrayWaterColor()} label={getLiquidLevelGrayWaterText()} sensorValue={40} onClick={()=>{}} size={120} percentege={50}/>
        <LiquidLevelIndicator color={getLiquidLevelBlackWaterColor()} label={getLiquidLevelBlackWaterText()} sensorValue={40} onClick={()=>{}} size={120} percentege={50}/>
    </View>
  );
};

export default LiquidLevelIndicatorsContainer;

const styles = StyleSheet.create({
  container: {
    padding : 0,
    flexDirection : 'row',
    justifyContent : 'space-between',
    width : '100%',
  }
});
