//
// Created by haluk on 10/31/24.
//

#include "LiquidLevelSensor.h"
#include "Common.h"
#include <Arduino.h>

LiquidLevelSensor::LiquidLevelSensor(int pin, std::string& printKeyAnalogValue, std::string& printKeyPercentage, int minValue, int maxValue)
: pin(pin), printKeyAnalogValue(printKeyAnalogValue), printKeyPercentage(printKeyPercentage), minValue(minValue), maxValue(maxValue)
{
}

void LiquidLevelSensor::init() {
    analogReadResolution(12);
    pinMode(this->pin, INPUT);
}

void LiquidLevelSensor::read() {
    this->analogValue = analogRead(this->pin);
    int av = this->analogValue;
    if(av > this->maxValue){
        av = this->maxValue;
    }
    if(av < this->minValue){
        av = this->minValue;
    }
    this->percentage = 100 - map(av, this->minValue, this->maxValue, 0, 100);
}


int LiquidLevelSensor::getAnalogValue() {
    return this->analogValue;
}

int LiquidLevelSensor::getPercentage() {
    return this->percentage;
}

std::string LiquidLevelSensor::toAnalogValueString() {
    return this->printKeyAnalogValue + ":" + std::to_string(this->analogValue);
}
std::string LiquidLevelSensor::toPercentageString() {
    return this->printKeyPercentage + ":" + std::to_string(this->percentage);
}



