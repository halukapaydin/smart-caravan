import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {PAGE_BLUETOOTH_CONFIG, PAGE_HOME} from "./Pages.ts";
import {COLOR_BACKGROUND} from "../util/BluetoothUtil.ts";
import PageHeader from "./PageHeader.tsx";
import HomePage from "./home";
import BluetoothConfigPage from "./bluetoothConfigPage";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

interface PageContainerProps {
}


const PageContainer = (props: PageContainerProps) => {
    const onHomeFocus = () => {
    }

    const onHomeBlur = () => {
    }

    useEffect(() => {
        onHomeFocus();
    }, []);


    return <NavigationContainer>
        <Stack.Navigator
            initialRouteName={PAGE_HOME}
            screenOptions={{
                contentStyle: {
                    backgroundColor: COLOR_BACKGROUND
                },
                header: (props) => <PageHeader/>
            }}>
            <Stack.Screen name={PAGE_HOME} component={HomePage} options={{title: 'Welcome'}}
                          listeners={{
                              focus: onHomeFocus,
                              blur: onHomeBlur
                          }}

            />
            <Stack.Screen name={PAGE_BLUETOOTH_CONFIG} component={BluetoothConfigPage}/>
        </Stack.Navigator>
    </NavigationContainer>
};
export default PageContainer;