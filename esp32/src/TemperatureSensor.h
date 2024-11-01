//
// Created by haluk on 10/31/24.
//

#ifndef ESP32_TEMPERATURESENSOR_H
#define ESP32_TEMPERATURESENSOR_H

#include <Arduino.h>
#include <DHT.h>
#include <Adafruit_Sensor.h>

class TemperatureSensor {
private:
    DHT* dht;
    float humidity;
    float temperature;
    int pin;
public:
    TemperatureSensor(int pin);
    void init();
    float getTemperature();
    float getHumidity();
    std::string toHumidityString();
    std::string toTemperatureString();
    void read();
};


#endif //ESP32_TEMPERATURESENSOR_H
