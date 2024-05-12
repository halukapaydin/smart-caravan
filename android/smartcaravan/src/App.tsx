import React from 'react';
import {StatusBar} from 'react-native';
import BluetoothConfigPage from "./page/bluetoothConfigPage/index";
import {BluetoothManagerContextProvider} from "./context/BluetoothManagerContext.tsx";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from "./page/home";
import PageHeader from "./page/PageHeader.tsx";
import {PAGE_BLUETOOTH_CONFIG, PAGE_HOME} from "./page/Pages.ts";
import {COLOR_BACKGROUND} from "./util/BluetoothUtil.ts";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <BluetoothManagerContextProvider>
            <StatusBar hidden={true}/>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={PAGE_HOME}
                    screenOptions={{
                        contentStyle : {
                            backgroundColor : COLOR_BACKGROUND
                        },
                        header: (props) => <PageHeader/>
                    }}>
                    <Stack.Screen name={PAGE_HOME} component={HomePage} options={{title: 'Welcome'}}/>
                    <Stack.Screen name={PAGE_BLUETOOTH_CONFIG} component={BluetoothConfigPage}/>
                </Stack.Navigator>
            </NavigationContainer>
        </BluetoothManagerContextProvider>
    );
};

export default App;
