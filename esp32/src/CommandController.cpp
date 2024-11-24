#include <Arduino.h>
#include "Common.h"
#include "CommandController.h"
#include "Relay.h"

void CommandController::handleCommand(std::string &command) {
    if (command.rfind(RELAY_OFF_PREFIX, 0) == 0) {
        this->relayOff(command);
        return;
    } else if (command.rfind(RELAY_ON_PREFIX, 0) == 0) {
        this->relayOn(command);
        return;
    } else if (command.rfind(PRINT_ALL, 0) == 0) {
        printAll(command);
        return;
    } else if (command.rfind(PRINT_RELAYS, 0) == 0) {
        this->printRelays(command);
        return;
    } else if (command.rfind(PRINT_TEMPERATURE, 0) == 0) {
        this->printTemperature(command);
        return;
    } else if (command.rfind(PRINT_WATER_LEVEL_CLEAN, 0) == 0) {
        this->printCleanWaterLevel(command);
        return;
    } else if (command.rfind(PRINT_WATER_LEVEL_GRAY, 0) == 0) {
        this->printGrayWaterLevel(command);
        return;
    } else if (command.rfind(PRINT_WATER_LEVEL_BLACK, 0) == 0) {
        this->printBlackWaterLevel(command);
        return;
    } else if (command.rfind(PRINT_AIR_QUALITY_LEVEL, 0) == 0) {
        this->printAirQuality(command);
        return;
    } else if (command.rfind(PRINT_GAS_LEVEL, 0) == 0) {
        this->printGasLevel(command);
        return;
    } else if (command.rfind(PRINT_BATTERY_LEVEL, 0) == 0) {
        //print battery level
        return;
    } else {
        Serial.print("Unknown command :");
        Serial.println(command.c_str());
    }
}

CommandController::CommandController(Ble &ble) : ble(&ble) {
}

void CommandController::init() {
    for (int i = 1; i <= RELAY_COUNT; ++i) {
        Relay *pRelay = getRelay(i);
        if (pRelay != nullptr) {
            pRelay->init();
        }
    }
    LiquidLevelSensor *pCleanWaterLevel = getCleanWaterLevel();
    pCleanWaterLevel->init();

    LiquidLevelSensor *pGrayWaterLevel = getGrayWaterLevel();
    pGrayWaterLevel->init();

    LiquidLevelSensor *pBlackWaterLevel = getBlackWaterLevel();
    pBlackWaterLevel->init();
    
    TemperatureSensor *pTemperatureSensor = getTemperatureSensor();
    pTemperatureSensor->init();

    GasSensor *pGasSensor = getGasSensor();
    pGasSensor->init();
    
    AirQualitySensor *pQualitySensor = getAirQualitySensor();
    pQualitySensor->init();
}

void CommandController::relayOff(std::string &command) {
    int number = std::stoi(command.substr(RELAY_OFF_PREFIX.length()));
    Relay *relay = getRelay(number);
    if (relay == nullptr) {
        return;
    }
    relay->switchOff();
    ble->setValue(relay->toString());
    Serial.println(("Relay switch off " + std::to_string(number)).c_str());
}

void CommandController::relayOn(std::string &command) {
    int number = std::stoi(command.substr(RELAY_ON_PREFIX.length()));
    Relay *relay = getRelay(number);
    if (relay == nullptr) {
        return;
    }
    relay->switchOn();
    ble->setValue(relay->toString());
    Serial.println(("Relay switch on " + std::to_string(number)).c_str());
}

void CommandController::printRelays(std::string &command) {
    std::string data = getRelaysString(command);
    ble->setValue(data);
    Serial.println("All relays state :");
    Serial.println(data.c_str());
}

void CommandController::printCleanWaterLevel(std::string &command) {
    std::string data = getCleanWaterLevelString(command);
    ble->setValue(data);
    Serial.println("clean water levels :");
    Serial.println(data.c_str());
}
void CommandController::printGrayWaterLevel(std::string &command) {
    std::string data = getGrayWaterLevelString(command);
    ble->setValue(data);
    Serial.println("gray water levels :");
    Serial.println(data.c_str());
}
void CommandController::printBlackWaterLevel(std::string &command) {
    std::string data = getBlackWaterLevelString(command);
    ble->setValue(data);
    Serial.println("black water levels :");
    Serial.println(data.c_str());
}

void CommandController::printWaterLevels(std::string &command) {
    std::string data;
    data += getCleanWaterLevelString(command);
    data += getGrayWaterLevelString(command);
    data += getBlackWaterLevelString(command);
    ble->setValue(data);
    Serial.println("water levels :");
    Serial.println(data.c_str());
}

void CommandController::printTemperature(std::string &command) {
    std::string data = getTemperatureString(command);
    ble->setValue(data);
    Serial.println("Temperature and humidity :");
    Serial.println(data.c_str());
}

void CommandController::printAirQuality(std::string &command) {
    std::string data = getAirQualityString(command);
    ble->setValue(data);
    Serial.println("Aiq Quality :");
    Serial.println(data.c_str());
}

void CommandController::printGasLevel(std::string &command) {
    std::string data = getGasLevelString(command);
    ble->setValue(data);
    Serial.println("Aiq Quality :");
    Serial.println(data.c_str());
}
std::string CommandController::getRelaysString(std::string &command){
    std::string data;
    for (int i = 1; i <= RELAY_COUNT; ++i) {
        Relay *relay = getRelay(i);
        data += relay->toString() + ";";
    }
    return data;
}

std::string CommandController::getCleanWaterLevelString(std::string &command){
    LiquidLevelSensor *pSensor = getCleanWaterLevel();
    std::string data;
    pSensor->read();
    data += pSensor->toAnalogValueString() + ";";
    data += pSensor->toPercentageString() + ";";
    return data;
}

std::string CommandController::getGrayWaterLevelString(std::string &command){
    LiquidLevelSensor *pSensor = getGrayWaterLevel();
    std::string data;
    pSensor->read();
    data += pSensor->toAnalogValueString() + ";";
    data += pSensor->toPercentageString() + ";";
    return data;
}

std::string CommandController::getBlackWaterLevelString(std::string &command){
    LiquidLevelSensor *pSensor = getBlackWaterLevel();
    std::string data;
    pSensor->read();
    data += pSensor->toAnalogValueString() + ";";
    data += pSensor->toPercentageString() + ";";
    return data;
}

std::string CommandController::getTemperatureString(std::string &command){
    TemperatureSensor *pSensor = getTemperatureSensor();
    std::string data;
    pSensor->read();
    data += pSensor->toTemperatureString() + ";";
    data += pSensor->toHumidityString() + ";";
    return data;
}

std::string CommandController::getAirQualityString(std::string &command){
    std::string data;
    AirQualitySensor *pSensor = getAirQualitySensor();
    pSensor->read();
    data += pSensor->toValueString() + ";";
    data += pSensor->toLevelString() + ";";
    return data;
}

std::string CommandController::getGasLevelString(std::string &command){
    GasSensor *pSensor = getGasSensor();
    std::string data;
    pSensor->read();
    data += pSensor->toValueString() + ";";
    data += pSensor->toLevelString() + ";";
    return data;
}

void CommandController::printAll(std::string &command) {
    std::string data;
    data += getRelaysString(command);
    data += getCleanWaterLevelString(command);
    data += getGrayWaterLevelString(command);
    data += getBlackWaterLevelString(command);
    data += getTemperatureString(command);
    data += getAirQualityString(command);
    data += getGasLevelString(command);
    ble->setValue(data);
    Serial.println("All data :");
    Serial.println(data.c_str());

}


