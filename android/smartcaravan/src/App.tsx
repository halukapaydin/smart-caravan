import React from 'react';
import {StatusBar} from 'react-native';
import {BluetoothManagerContextProvider} from "./context/BluetoothManagerContext.tsx";
import PageContainer from "./page";


const App = () => {
    return (
        <BluetoothManagerContextProvider>
            <StatusBar hidden={true}/>
            <PageContainer/>
        </BluetoothManagerContextProvider>
    );
};

export default App;
