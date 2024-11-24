//
// Created by haluk on 10/31/24.
//
#include "TemperatureSensor.h"
#include <Arduino.h>
#include "Common.h"
#include <Adafruit_Sensor.h>
#include <DHT.h>


TemperatureSensor::TemperatureSensor(int pin) : pin(pin), humidity(-100), temperature(-100) {}

float TemperatureSensor::getHumidity() {
    return this->humidity;
}

float TemperatureSensor::getTemperature() {
    return this->temperature;
}

void TemperatureSensor::read() {
    this->humidity = this->dht->readHumidity();
    this->temperature = this->dht->readTemperature();
}

std::string TemperatureSensor::toHumidityString() {
    return PRINT_KEY_HUMIDITY + ":" + std::to_string(this->getHumidity());
}

std::string TemperatureSensor::toTemperatureString() {
    return PRINT_KEY_TEMPERATURE + ":" + std::to_string(this->getTemperature());
}

void TemperatureSensor::init() {
    this->dht = new DHT(this->pin, DHT11);
    this->dht->begin();
}
