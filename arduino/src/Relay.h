#ifndef SMART_CARAVAN_RELAY_H
#define SMART_CARAVAN_RELAY_H

#include <Arduino.h>
#include <Common.h>

enum RelayState {
    OFF, ON
};

RelayState reverseState(RelayState &state);

struct Relay {
    int relayPin;
    RelayState state;
    char dataKey;

    Relay(int _pin, char _dataKey, RelayState _state = OFF) :
            relayPin(_pin), state(_state),
            dataKey(_dataKey) {}

    void initRelay() {
        pinMode(this->relayPin, OUTPUT);
        int relayValue = this->state == ON ? LOW : HIGH;
        digitalWrite(this->relayPin, relayValue);
    }

    void switchRelay() {
        this->state = reverseState(this->state);
        int relayValue = this->state == ON ? LOW : HIGH;
        digitalWrite(this->relayPin, relayValue);
    }
    void write(HardwareSerial *serial) {
        serial->write(this->dataKey);
        serial->write(this->state);
    }
};

void initRelays();

Relay *getRelay(int command);

bool handleRelayCommand(int command);

#endif