//
// Created by haluk on 10/31/24.
//

#ifndef ESP32_LIQUIDLEVELSENSOR_H
#define ESP32_LIQUIDLEVELSENSOR_H

#include <Arduino.h>

class LiquidLevelSensor {
private:
    int pin;
    int minValue;
    int maxValue;
    std::string printKeyAnalogValue;
    std::string printKeyPercentage;
    int analogValue;
    int percentage;
public:
    LiquidLevelSensor(int pin, std::string& printKeyAnalogValue, std::string& printKeyPercentage, int minValue, int maxValue);
    void init();
    void read();
    int getPercentage();
    int getAnalogValue();
    std::string toAnalogValueString();
    std::string toPercentageString();
};


#endif //ESP32_LIQUIDLEVELSENSOR_H
