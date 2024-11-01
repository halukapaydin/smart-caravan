//
// Created by haluk on 11/1/24.
//

#ifndef ESP32_GASSENSOR_H
#define ESP32_GASSENSOR_H
#include <Arduino.h>

#define MAX_ADC_VALUE 4095    // 12-bit ADC çözünürlüğü
#define VREF 3.3              // Referans voltaj

class GasSensor {
private:
    int pin;
    float value;
    int level;
public:
    GasSensor(int pin);
    void init();
    void read();
    float getValue();
    int getLevel();
    std::string toValueString();
    std::string toLevelString();
};


#endif //ESP32_GASSENSOR_H
