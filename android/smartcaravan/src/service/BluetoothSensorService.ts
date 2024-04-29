import ISensorService from "./ISensorService.ts";
import SensorValues from "../model/SensorValues.ts";

export default class BluetoothSensorService implements ISensorService {


    constructor() {

    }

    readHumidityValue = () => {
        return 0;
    }

    readAllValues = () => {
        return new SensorValues();
    }

    readTemperatureValue = () => {
        return 0;
    }

    readRelayButtonValue = (relayButtonId: number) => {
        return 0;
    }

    switchRelayButton(relayButtonId: number): number {
        return 0;
    }


}