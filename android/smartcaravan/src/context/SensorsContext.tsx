import React, {useMemo, useState} from 'react';
import BluetoothSensorService from "../service/BluetoothSensorService.ts";
import ISensorService from "../service/ISensorService.ts";
import SensorValues from "../model/SensorValues.ts";

interface ISensorsContext {
    readAllValues: () => SensorValues;
    readHumidityValue: () => SensorValues;
    readTemperatureValue: () => SensorValues;
    readRelayButtonValue: (relayButtonId: number) => SensorValues;
    dataUpdateTime: number;
    sensorsData : SensorValues;
}

const DEFAULT_VALUE: ISensorsContext = {
    dataUpdateTime: 0,
    sensorsData : new SensorValues(),
    readAllValues: () => new SensorValues(),
    readHumidityValue: () => new SensorValues(),
    readTemperatureValue: () => new SensorValues(),
    readRelayButtonValue: () => new SensorValues()
}

const SensorsContext = React.createContext(DEFAULT_VALUE);

export const SensorsContextProvider = ({children}: { children: any }) => {
    const [data, setData] = useState(new SensorValues());
    const [dataUpdateTime, setDataUpdateTime] = useState(0);

    const bluetoothSensorService:ISensorService = useMemo(() => {
        return new BluetoothSensorService();
    }, []);

    const readAllValues = () => {
        const sensorValues: SensorValues = bluetoothSensorService.readAllValues();
        setData(sensorValues);
        setDataUpdateTime(new Date().getTime());
        return sensorValues;
    }

    const readHumidityValue = () => {
        const humidityValue = bluetoothSensorService.readHumidityValue();
        const newSensorData: SensorValues = new SensorValues();
        Object.assign(newSensorData, data);
        newSensorData.setHumidityValue(humidityValue)
        setDataUpdateTime(new Date().getTime());
        setData(newSensorData)
        return newSensorData;

    }
    const readTemperatureValue = () => {
        const humidityValue = bluetoothSensorService.readTemperatureValue();
        const newSensorData: SensorValues = new SensorValues();
        Object.assign(newSensorData, data);
        newSensorData.setTemperatureValue(humidityValue)
        setData(newSensorData)
        setDataUpdateTime(new Date().getTime());
        return newSensorData;
    }


    const readRelayButtonValue = (relayButtonId: number) => {
        const relayButtonValue = bluetoothSensorService.readRelayButtonValue(relayButtonId);
        const newSensorData: SensorValues = new SensorValues();
        Object.assign(newSensorData, data);
        newSensorData.getButtonsValue()[relayButtonId - 1] = relayButtonValue;
        setData(newSensorData)
        setDataUpdateTime(new Date().getTime());
        return newSensorData;
    }

    return <SensorsContext.Provider value={
        {
            readAllValues: readAllValues,
            readHumidityValue: readHumidityValue,
            readTemperatureValue: readTemperatureValue,
            readRelayButtonValue: readRelayButtonValue,
            dataUpdateTime: dataUpdateTime,
            sensorsData : data
        }
    }>
        {children}
    </SensorsContext.Provider>
}

export default SensorsContext;