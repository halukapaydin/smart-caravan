#include <TemperatureSensor.h>

TemperatureSensor *TEMPERATURE_SENSOR_1 = new TemperatureSensor(PIN_TEMPERATURE_SENSOR_1, DATA_KEY_RELAY_TEMPERATURE, DATA_KEY_RELAY_HUMIDITY);

TemperatureSensor *getTemperatureSensor1(){
    return TEMPERATURE_SENSOR_1;
}
