import React from 'react';
import {StatusBar} from 'react-native';
import BluetoothConfigPage from "./page/bluetoothConfigPage/index";
import {BluetoothManagerContextProvider} from "./context/BluetoothManagerContext.tsx";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from "./page/home";
import PageHeader from "./page/PageHeader.tsx";
import {PAGE_BLUETOOTH_CONFIG, PAGE_HOME} from "./page/Pages.ts";
import {SensorsContextProvider} from "./context/SensorsContext.tsx";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <BluetoothManagerContextProvider>
            <SensorsContextProvider>
                <StatusBar hidden={false}/>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={PAGE_BLUETOOTH_CONFIG} screenOptions={{
                        header: (props) => <PageHeader/>
                    }}>
                        <Stack.Screen name={PAGE_HOME} component={HomePage} options={{title: 'Welcome'}}/>
                        <Stack.Screen name={PAGE_BLUETOOTH_CONFIG} component={BluetoothConfigPage}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </SensorsContextProvider>
        </BluetoothManagerContextProvider>
    );
};

export default App;
