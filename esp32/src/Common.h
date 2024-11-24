//
// Created by haluk on 10/30/24.
//

#ifndef ESP32_COMMON_H
#define ESP32_COMMON_H

#include "Relay.h"
#include "TemperatureSensor.h"
#include "LiquidLevelSensor.h"
#include "AirQualitySensor.h"
#include "GasSensor.h"

static std::string RELAY_OFF_PREFIX = "RELAY_OFF:";
static std::string RELAY_ON_PREFIX = "RELAY_ON:";
static std::string PRINT_ALL = "PRINT_ALL";
static std::string PRINT_RELAYS = "PRINT_RELAYS";
static std::string PRINT_TEMPERATURE = "PRINT_TEMP";
static std::string PRINT_WATER_LEVEL_CLEAN = "PRINT_WL_CLEAN";
static std::string PRINT_WATER_LEVEL_GRAY = "PRINT_WL_GRAY";
static std::string PRINT_WATER_LEVEL_BLACK = "PRINT_WL_BLACK";
static std::string PRINT_GAS_LEVEL = "PRINT_GAS";
static std::string PRINT_AIR_QUALITY_LEVEL = "PRINT_AIR_QUALITY";
static std::string PRINT_BATTERY_LEVEL = "PRINT_BATTERY_LEVEL";

static std::string PRINT_KEY_RELAY = "R";
static std::string PRINT_KEY_HUMIDITY = "HMD";
static std::string PRINT_KEY_TEMPERATURE = "TEMP";
static std::string PRINT_KEY_CLEAN_WATER_LEVEL_VALUE = "WLV_C";
static std::string PRINT_KEY_GRAY_WATER_LEVEL_VALUE = "WLV_G";
static std::string PRINT_KEY_BLACK_WATER_LEVEL_VALUE = "WLV_B";
static std::string PRINT_KEY_CLEAN_WATER_LEVEL_PERCENTAGE = "WLP_C";
static std::string PRINT_KEY_GRAY_WATER_LEVEL_PERCENTAGE = "WLP_G";
static std::string PRINT_KEY_BLACK_WATER_LEVEL_PERCENTAGE = "WLP_B";
static std::string PRINT_KEY_AIR_QUALITY_VALUE = "AIRQV";
static std::string PRINT_KEY_AIR_QUALITY_LEVEL = "AIRQL";
static std::string PRINT_KEY_GAS_VALUE = "GASV";
static std::string PRINT_KEY_GAS_LEVEL = "GASL";


static int RELAY_COUNT = 11;
Relay* getRelay(int index);
TemperatureSensor *getTemperatureSensor();
LiquidLevelSensor* getCleanWaterLevel();
LiquidLevelSensor* getGrayWaterLevel();
LiquidLevelSensor* getBlackWaterLevel();
AirQualitySensor* getAirQualitySensor();
GasSensor* getGasSensor();
#endif //ESP32_COMMON_H
