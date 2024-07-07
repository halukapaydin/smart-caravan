//
// Created by haluk on 5.07.2024.
//

#ifndef SMART_CARAVAN__LEVELSENSOR_H
#define SMART_CARAVAN__LEVELSENSOR_H

#include <Arduino.h>

struct LevelSensor {
    int analogPin;
    int minValue;
    int maxValue;
    int sensorLevel;
    int dateKey;

    LevelSensor(int pin, int minValue, int maxValue, int dataKey)
            : analogPin(pin),
              minValue(minValue),
              maxValue(maxValue),
              dateKey(dataKey) {}

    void read() {
        int value = analogRead(analogPin);
        this->sensorLevel = map(value, this->minValue, this->maxValue, 0, 100);
        if (sensorLevel < 0) sensorLevel = 0;
        if (sensorLevel > 100) sensorLevel = 100;
    }

    void write(HardwareSerial *serial) {
        serial->write(this->dateKey);
        serial->write(this->sensorLevel);
    }
};

LevelSensor *getCleanWaterSensor();

LevelSensor *getGrayWaterSensor();

LevelSensor *getBlackWaterSensor();

#endif //SMART_CARAVAN_LEVELSENSOR_H
