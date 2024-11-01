//
// Created by haluk on 10/30/24.
//
#include "Relay.h"
#include "Common.h"
#include "TemperatureSensor.h"
#include "LiquidLevelSensor.h"
#include "AirQualitySensor.h"
#include "GasSensor.h"

Relay *relay1 = new Relay(23, 1);
Relay *relay2 = new Relay(22, 2);
Relay *relay3 = new Relay(21, 3);
Relay *relay4 = new Relay(19, 4);
Relay *relay5 = new Relay(18, 5);
Relay *relay6 = new Relay(5, 6);
Relay *relay7 = new Relay(17, 7);
Relay *relay8 = new Relay(16, 8);
Relay *relay9 = new Relay(4, 9);
Relay *relay10 = new Relay(13, 10);
Relay *relay11 = new Relay(14, 11);

TemperatureSensor *temperatureSensor = new TemperatureSensor(32);
LiquidLevelSensor* cleanWaterLevel = new LiquidLevelSensor(39, PRINT_KEY_CLEAN_WATER_LEVEL_VALUE, PRINT_KEY_CLEAN_WATER_LEVEL_PERCENTAGE, 0, 654);
LiquidLevelSensor* grayWaterLevel = new LiquidLevelSensor(34, PRINT_KEY_GRAY_WATER_LEVEL_VALUE,PRINT_KEY_GRAY_WATER_LEVEL_PERCENTAGE, 131, 793);
LiquidLevelSensor* blackWaterLevel = new LiquidLevelSensor(34, PRINT_KEY_BLACK_WATER_LEVEL_VALUE,PRINT_KEY_BLACK_WATER_LEVEL_PERCENTAGE, 131, 793);

AirQualitySensor* airQualitySensor = new AirQualitySensor(26);
GasSensor* gasSensor = new GasSensor(25);

AirQualitySensor* getAirQualitySensor(){
    return airQualitySensor;
}
GasSensor* getGasSensor(){
    return gasSensor;
}
LiquidLevelSensor* getCleanWaterLevel(){
    return cleanWaterLevel;
}
LiquidLevelSensor* getGrayWaterLevel(){
    return grayWaterLevel;
}
LiquidLevelSensor* getBlackWaterLevel(){
    return blackWaterLevel;
}
TemperatureSensor *getTemperatureSensor(){
    return temperatureSensor;
}
Relay *getRelay(int index) {
    switch (index) {
        case 1:
            return relay1;
        case 2:
            return relay2;
        case 3:
            return relay3;
        case 4:
            return relay4;
        case 5:
            return relay5;
        case 6:
            return relay6;
        case 7:
            return relay7;
        case 8:
            return relay8;
        case 9:
            return relay9;
        case 10:
            return relay10;
        case 11:
            return relay11;
        default:
            return nullptr;
    }
}