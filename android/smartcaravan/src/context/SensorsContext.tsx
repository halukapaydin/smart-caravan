import React, {Dispatch, useContext, useEffect, useMemo, useState} from 'react';
import BluetoothSensorService from "../service/BluetoothSensorService.ts";
import ISensorService from "../service/ISensorService.ts";
import SensorValues from "../model/SensorValues.ts";
import {BluetoothManagerContext} from "./BluetoothManagerContext.tsx";
import {parseBluetoothData} from "../util/BluetoothUtil.ts";

interface ISensorsContext {
    readAllValues: () => SensorValues;
    readHumidityValue: () => SensorValues;
    readTemperatureValue: () => SensorValues;
    readRelayButtonValue: (relayButtonId: number) => SensorValues;
    dataUpdateTime: number;
    sensorsData : SensorValues;
    sendCommand : Dispatch<number>;
}

const DEFAULT_VALUE: ISensorsContext = {
    dataUpdateTime: 0,
    sensorsData : new SensorValues(),
    readAllValues: () => new SensorValues(),
    readHumidityValue: () => new SensorValues(),
    readTemperatureValue: () => new SensorValues(),
    readRelayButtonValue: () => new SensorValues(),
    sendCommand : ()=>{}
}

const SensorsContext = React.createContext(DEFAULT_VALUE);

export const SensorsContextProvider = ({children}: { children: any }) => {
    const [data, setData] = useState(new SensorValues());
    const [dataUpdateTime, setDataUpdateTime] = useState(0);
    const {setOnDidDataUpdateListener, writeDataOnConnectedDevice} = useContext(BluetoothManagerContext);
    const onDataUpdate = useMemo(()=>{
        return (data:any)=>{
            let sensorValues = parseBluetoothData(data);
            setData(sensorValues);
            setDataUpdateTime(new Date().getTime());
        }
    }, []);
    const sensorService:ISensorService = useMemo(() => {
        return new BluetoothSensorService();
    }, []);

    useEffect(() => {
        setOnDidDataUpdateListener(onDataUpdate);
        return () => {};
    }, []);


    const readAllValues = () => {
        const sensorValues: SensorValues = sensorService.readAllValues();
        setData(sensorValues);
        setDataUpdateTime(new Date().getTime());
        return sensorValues;
    }

    const readHumidityValue = () => {
        const humidityValue = sensorService.readHumidityValue();
        const newSensorData: SensorValues = new SensorValues();
        Object.assign(newSensorData, data);
        newSensorData.setHumidityValue(humidityValue)
        setDataUpdateTime(new Date().getTime());
        setData(newSensorData)
        return newSensorData;

    }
    const readTemperatureValue = () => {
        const humidityValue = sensorService.readTemperatureValue();
        const newSensorData: SensorValues = new SensorValues();
        Object.assign(newSensorData, data);
        newSensorData.setTemperatureValue(humidityValue)
        setData(newSensorData)
        setDataUpdateTime(new Date().getTime());
        return newSensorData;
    }


    const readRelayButtonValue = (relayButtonId: number) => {
        const relayButtonValue = sensorService.readRelayButtonValue(relayButtonId);
        const newSensorData: SensorValues = new SensorValues();
        Object.assign(newSensorData, data);
        newSensorData.getButtonsValue()[relayButtonId - 1] = relayButtonValue;
        setData(newSensorData)
        setDataUpdateTime(new Date().getTime());
        return newSensorData;
    }

    const sendCommand = (command : number)=>{
        writeDataOnConnectedDevice(command);
    }

    return <SensorsContext.Provider value={
        {
            readAllValues: readAllValues,
            readHumidityValue: readHumidityValue,
            readTemperatureValue: readTemperatureValue,
            readRelayButtonValue: readRelayButtonValue,
            dataUpdateTime: dataUpdateTime,
            sensorsData : data,
            sendCommand : sendCommand
        }
    }>
        {children}
    </SensorsContext.Provider>
}

export default SensorsContext;