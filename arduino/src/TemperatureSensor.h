#ifndef SMART_CARAVAN_TEMPERATURESENSOR_H
#define SMART_CARAVAN_TEMPERATURESENSOR_H

#include <Arduino.h>
#include <Common.h>

#define DHT11LIB_VERSION "0.4.1"
#define DHTLIB_OK                0
#define DHTLIB_ERROR_CHECKSUM    -1
#define DHTLIB_ERROR_TIMEOUT    -2


struct TemperatureSensor {
    int pin;
    int dataKeyHumidity;
    int dataKeyTemperature;
    int humidity;
    int temperature;

    TemperatureSensor(int pin, int dataKeyHumidity, int dataKeyTemperature)
            : pin(pin),
              dataKeyHumidity(dataKeyHumidity),
              dataKeyTemperature(dataKeyTemperature),
              humidity(0), temperature(0) {}

    void write(HardwareSerial *serial) {
        serial->write(this->dataKeyTemperature);
        serial->write(this->temperature);
        serial->write(this->dataKeyHumidity);
        serial->write(this->humidity);
    }

    int read() {
        // BUFFER TO RECEIVE
        uint8_t bits[5];
        uint8_t cnt = 7;
        uint8_t idx = 0;

        // EMPTY BUFFER
        for (int i = 0; i < 5; i++) bits[i] = 0;

        // REQUEST SAMPLE
        pinMode(pin, OUTPUT);
        digitalWrite(pin, LOW);
        delay(18);
        digitalWrite(pin, HIGH);
        delayMicroseconds(40);
        pinMode(pin, INPUT);

        // ACKNOWLEDGE or TIMEOUT
        unsigned int loopCnt = 10000;
        while (digitalRead(pin) == LOW)
            if (loopCnt-- == 0) return DHTLIB_ERROR_TIMEOUT;

        loopCnt = 10000;
        while (digitalRead(pin) == HIGH)
            if (loopCnt-- == 0) return DHTLIB_ERROR_TIMEOUT;

        // READ OUTPUT - 40 BITS => 5 BYTES or TIMEOUT
        for (int i = 0; i < 40; i++) {
            loopCnt = 10000;
            while (digitalRead(pin) == LOW)
                if (loopCnt-- == 0) return DHTLIB_ERROR_TIMEOUT;

            unsigned long t = micros();

            loopCnt = 10000;
            while (digitalRead(pin) == HIGH)
                if (loopCnt-- == 0) return DHTLIB_ERROR_TIMEOUT;

            if ((micros() - t) > 40) bits[idx] |= (1 << cnt);
            if (cnt == 0)   // next byte?
            {
                cnt = 7;    // restart at MSB
                idx++;      // next byte!
            } else cnt--;
        }

        // WRITE TO RIGHT VARS
        // as bits[1] and bits[3] are allways zero they are omitted in formulas.
        this->temperature = bits[0];
        this->humidity = bits[2];

        uint8_t sum = bits[0] + bits[2];

        if (bits[4] != sum) return DHTLIB_ERROR_CHECKSUM;
        return DHTLIB_OK;
    }
};

TemperatureSensor *getTemperatureSensor1();



#endif