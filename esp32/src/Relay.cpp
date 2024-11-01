#include "Relay.h"
#include <Arduino.h>
#include "Common.h"


Relay::Relay(uint8_t pin, int id) : pin(pin), id(id), state(LOW) {
}

void Relay::switchOff() {
    this->state = LOW;
    digitalWrite(this->pin, this->state);
}

void Relay::switchOn() {
    this->state = HIGH;
    digitalWrite(this->pin, this->state);
}

int Relay::getPin() const {
    return this->pin;
}

int Relay::getId() const {
    return this->id;
}

int Relay::getState() const {
    return this->state;
}

std::string Relay::toString() const {
    return PRINT_KEY_RELAY + std::to_string(getId()) + ":" + std::to_string(getState());
}

void Relay::init() {
    pinMode(this->getPin(), OUTPUT);
    this->switchOff();
    Serial.println("pin mode output : " + String(this->getPin()));
}


