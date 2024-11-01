//
// Created by haluk on 10/29/24.
//

#ifndef ESP32_COMMANDCONTROLLER_H
#define ESP32_COMMANDCONTROLLER_H

#include <Arduino.h>
#include "Relay.h"
#include "Ble.h"
#include <array>



class CommandController {
private:
    Ble *ble;

public:
    explicit CommandController(Ble &ble);

    virtual void handleCommand(std::string &command);

    virtual void init();

    virtual void relayOff(std::string &command);

    virtual void relayOn(std::string &command);

    virtual void printAll(std::string &command);

    virtual void printRelays(std::string &command);

    virtual void printWaterLevels(std::string &command);

    virtual void printCleanWaterLevel(std::string &command);

    virtual void printGrayWaterLevel(std::string &command);

    virtual void printBlackWaterLevel(std::string &command);

    virtual void printTemperature(std::string &command);

    virtual void printAirQuality(std::string &command);

    virtual void printGasLevel(std::string &command);

    virtual std::string getRelaysString(std::string &command);

    virtual std::string getCleanWaterLevelString(std::string &command);

    virtual std::string getGrayWaterLevelString(std::string &command);

    virtual std::string getBlackWaterLevelString(std::string &command);

    virtual std::string getTemperatureString(std::string &command);

    virtual std::string getAirQualityString(std::string &command);

    virtual std::string getGasLevelString(std::string &command);
};

#endif //ESP32_COMMANDCONTROLLER_H
