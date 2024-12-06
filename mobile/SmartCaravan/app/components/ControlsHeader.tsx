import { faBluetoothB } from '@fortawesome/free-brands-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getApplicationHeader } from '../config/ApplicationConfig';

interface ControlsHeaderProps { }

const ControlsHeader = (props: ControlsHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.headerText}>{getApplicationHeader()}</Text>
      </View>
      <View style={styles.item}>
      </View>
      <View style={{ ...styles.item, ...styles.buttons }}>
        <FontAwesomeIcon color={"white"} icon={faBluetoothB} size={25} />
        <FontAwesomeIcon color={"white"} icon={faGear} size={25} />
      </View>
    </View>
  );
};

export default ControlsHeader;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'blue',
    flexDirection: 'row',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10
  },
  item: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection : 'row',
    gap : 15,
    alignItems : 'flex-end',
    justifyContent : 'flex-end'
  },
  headerText: {
    color: 'white',
    fontSize: 18
  }
});
