import SensorValues from "../model/SensorValues.ts";

export default interface ISensorService{

    readHumidityValue : () => number;

    readAllValues : () => SensorValues;

    readTemperatureValue : () => number;

    readRelayButtonValue : (relayButtonId: number) => number;

    switchRelayButton : (relayButtonId:number) => number;
}