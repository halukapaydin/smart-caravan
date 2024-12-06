import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ControlsHeader from '../components/ControlsHeader';
import LightButtonsContainer from '../components/LightButtonsContainer';
import LiquidLevelIndicatorsContainer from '../components/LiquidLevelsIndicatorContainer';
import BatteryIndicator from '../components/BatteryIndicator';


interface ControlsPageProps {}

const ControlsPage = (props: ControlsPageProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ControlsHeader />
      </View>
      <View style={styles.body}>
        <LightButtonsContainer />
        <LiquidLevelIndicatorsContainer />
        <View>
          <BatteryIndicator height={120} onPress={()=>{}} sensorValue={120} width={70}/>
        </View>
      </View>
    </View>
  );
};

export default ControlsPage;

const styles = StyleSheet.create({
  container: {
    flexDirection : 'column',
    height : '100%',
    width : '100%',
    backgroundColor : 'black',
  },
  header : {
    height : 40
  },
  body : {
    flex : 1,
    padding : 20,
    justifyContent : 'space-between'
  }

});
