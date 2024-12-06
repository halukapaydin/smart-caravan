import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface DevicesPageProps {}

const DevicesPage = (props: DevicesPageProps) => {
  return (
    <View style={styles.container}>
      <Text>DevicesPage</Text>
    </View>
  );
};

export default DevicesPage;

const styles = StyleSheet.create({
  container: {}
});
