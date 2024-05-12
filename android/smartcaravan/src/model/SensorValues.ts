import {BUTTON_VALUE_UNKNOWN} from "./ButtonValue.ts";

export default class SensorValues {
    private buttonsValue: number[] = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    private humidityValue: number = 1;
    private temperatureValue: number = 1;
    private cleanWaterLevel : number = 1;
    private grayWaterLevel : number = 30;
    private blackWaterLevel : number = 80;
    private batteryVoltage : number = 80;


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

        return this.buttonsValue[buttonId-1];
    }

    setButtonsValue(value: number[]) {
        this.buttonsValue = value;
    }
    setButtonValue(buttonId:number, value: number) {
        if(!this.buttonsValue){
            return BUTTON_VALUE_UNKNOWN;
        }

        if(buttonId >= this.buttonsValue.length){
            return BUTTON_VALUE_UNKNOWN;
        }
        this.buttonsValue[buttonId-1] = value;
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

    getCleanWaterLevel() : number{
        return this.cleanWaterLevel;
    };

    setCleanWaterLevel(level:number){
        this.cleanWaterLevel = level;
    }
    getGrayWaterLevel() : number{
        return this.grayWaterLevel;
    };
    setGrayWaterLevel(level:number){
        this.grayWaterLevel = level;
    }

    getBatteryVoltage() : number{
        return this.batteryVoltage;
    };
    setBatteryVoltage(level:number){
        this.batteryVoltage = level;
    }
    getBlackWaterLevel() : number{
        return this.blackWaterLevel;
    };
    setBlackWaterLevel(level:number){
        this.blackWaterLevel = level;
    }

    clone() : SensorValues{
        const c = new SensorValues();
        Object.assign(c, this);
        return c;
    }
}
