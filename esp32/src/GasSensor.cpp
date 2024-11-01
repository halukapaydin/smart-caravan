//
// Created by haluk on 11/1/24.
//

#include "GasSensor.h"
#include "Common.h"


GasSensor::GasSensor(int pin) : pin(pin) {
}

void GasSensor::init() {
    pinMode(this->pin, INPUT);
}

void GasSensor::read() {
    int analogValue = analogRead(this->pin);
    float voltage = (analogValue * VREF) / MAX_ADC_VALUE;
    this->value = voltage;

    int level;
    if (voltage < 0.5) {
        //"Temiz Hava";
        level = 0;
    } else if (voltage < 1.0) {
//        "Normal Hava";
        level = 1;
    } else if (voltage < 2.0) {
//        "Kirli Hava";
        level = 2;

    } else {
//        "Tehlikeli Hava";
        level = 3;
    }
    this->level = level;
}

float GasSensor::getValue() {
    return this->value;
}

int GasSensor::getLevel() {
    return this->level;
}


std::string GasSensor::toValueString() {
    return PRINT_KEY_GAS_VALUE + ":" + std::to_string(this->getValue());
}

std::string GasSensor::toLevelString() {
    return PRINT_KEY_GAS_LEVEL + ":" + std::to_string(this->getLevel());
}


