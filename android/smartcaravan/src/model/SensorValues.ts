import {BUTTON_VALUE_UNKNOWN} from "./ButtonValue.ts";

export default class SensorValues {
    private buttonsValue: number[] = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    private humidityValue: number = 0;
    private temperatureValue: number = 0;


    getButtonsValue(): number[] {
        return this.buttonsValue;
    }

    getButtonValue(buttonId:number):number{
        if(!this.buttonsValue){
            return BUTTON_VALUE_UNKNOWN;
        }

        if(buttonId >= this.buttonsValue.length){
            return BUTTON_VALUE_UNKNOWN;
        }

        return this.buttonsValue[buttonId];
    }

    setButtonsValue(value: number[]) {
        this.buttonsValue = value;
    }

    getHumidityValue(): number {
        return this.humidityValue;
    }

    setHumidityValue(value: number) {
        this.humidityValue = value;
    }

    getTemperatureValue(): number {
        return this.temperatureValue;
    }

    setTemperatureValue(value: number) {
        this.temperatureValue = value;
    }

    clone() : SensorValues{
        const c = new SensorValues();
        Object.assign(c, this);
        return c;
    }
}
