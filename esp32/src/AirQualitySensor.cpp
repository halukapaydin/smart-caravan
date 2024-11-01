//
// Created by haluk on 11/1/24.
//

#include "AirQualitySensor.h"
#include "Common.h"


AirQualitySensor::AirQualitySensor(int pin) : pin(pin) {
}

void AirQualitySensor::init() {
    pinMode(this->pin, INPUT);
}

void AirQualitySensor::read() {
    int analogValue = analogRead(this->pin);
    float voltage = (analogValue * VREF) / MAX_ADC_VALUE;
    this->value = voltage;

    int level;
    if (voltage < 0.2) {
        //"Temiz";
        level = 0;
    } else if (voltage < 1.0) {
//        "Düşük Gaz Seviyesi";
        level = 1;
    } else if (voltage < 2.0) {
//        "Orta Gaz Seviyesi";
        level = 2;
    } else {
//        "Yüksek Gaz Seviyesi";
        level = 3;
    }
    this->level = level;
}

float AirQualitySensor::getValue() {
    return this->value;
}

int AirQualitySensor::getLevel() {
    return this->level;
}


std::string AirQualitySensor::toValueString() {
    return PRINT_KEY_AIR_QUALITY_VALUE + ":" + std::to_string(this->getValue());
}

std::string AirQualitySensor::toLevelString() {
    return PRINT_KEY_AIR_QUALITY_LEVEL + ":" + std::to_string(this->getLevel());
}


