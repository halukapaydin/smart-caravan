import {BUTTON_VALUE_UNKNOWN} from "./ButtonValue.ts";

export default class SensorValues {
    private buttonsValue: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    private humidityValue: number = 0;
    private temperatureValue: number = 0;
    private cleanWaterLevel : number = 0;
    private cleanWaterValue : number = 0;
    private grayWaterLevel : number = 0;
    private grayWaterValue : number = 0;
    private blackWaterLevel : number = 0;
    private blackWaterValue : number = 0;
    private batteryVoltage : number = 125;
    private airQualityLevel : number = 0;
    private airQualityValue : number = 0;
    private gasLevel : number = 0;
    private gasValue : number = 0;
    


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
    // clean water
    getCleanWaterLevel() : number{
        return this.cleanWaterLevel;
    };

    setCleanWaterLevel(level:number){
        this.cleanWaterLevel = level;
    }
    getCleanWaterValue() : number{
        return this.cleanWaterValue;
    };
    setCleanWaterValue(level:number){
        this.cleanWaterValue = level;
    }
    //gray water
    getGrayWaterLevel() : number{
        return this.grayWaterLevel;
    };
    setGrayWaterLevel(level:number){
        this.grayWaterLevel = level;
    }
    getGrayWaterValue() : number{
        return this.grayWaterValue;
    };
    setGrayWaterValue(level:number){
        this.grayWaterValue = level;
    }
    // black water
    getBlackWaterLevel() : number{
        return this.blackWaterLevel;
    };
    setBlackWaterLevel(level:number){
        this.blackWaterLevel = level;
    }
    getBlackWaterValue() : number{
        return this.blackWaterValue;
    };
    setBlackWaterValue(level:number){
        this.blackWaterValue = level;
    }
    // battery voltage
    getBatteryVoltage() : number{
        return this.batteryVoltage;
    };
    setBatteryVoltage(level:number){
        this.batteryVoltage = level;
    }

    getAirQualityLevel() : number{
        return this.airQualityLevel ;
    };
    setAirQualityLevel(level:number){
        this.airQualityLevel = level;
    }
    
    getAirQualityValue() : number{
        return this.airQualityValue;
    };
    setAirQualityValue(level:number){
        this.airQualityValue = level;
    }

    getGasLevel() : number{
        return this.gasLevel;
    };
    setGasLevel(level:number){
        this.gasLevel = level;
    }
    
    getGasValue() : number{
        return this.gasValue;
    };
    setGasValue(level:number){
        this.gasValue = level;
    }
    
    clone() : SensorValues{
        const c = new SensorValues();
        Object.assign(c, this);
        return c;
    }
}
