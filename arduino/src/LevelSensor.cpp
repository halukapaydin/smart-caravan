#include <LevelSensor.h>
#include <Common.h>

LevelSensor *LEVEL_SENSOR_CLEAN_WATER = new LevelSensor(PIN_CLEAN_WATER, 1005, 1023, DATA_KEY_RELAY_CLEAN_WATER_LEVEL);
LevelSensor *LEVEL_SENSOR_GRAY_WATER = new LevelSensor(PIN_GRAY_WATER, 1000, 1021, DATA_KEY_RELAY_GRAY_WATER_LEVEL);
LevelSensor *LEVEL_SENSOR_BLACK_WATER = new LevelSensor(PIN_BLACK_WATER, 1000, 1021, DATA_KEY_RELAY_BLACK_WATER_LEVEL);

LevelSensor *getCleanWaterSensor(){
    return LEVEL_SENSOR_CLEAN_WATER;
}

LevelSensor *getGrayWaterSensor(){
    return LEVEL_SENSOR_GRAY_WATER;
}

LevelSensor *getBlackWaterSensor(){
    return LEVEL_SENSOR_BLACK_WATER;
}
