//
// Created by haluk on 10/31/24.
//

#include "Buzzer.h"
#include <Arduino.h>

Buzzer::Buzzer(int pin) : pin(pin) {}

void Buzzer::init() {
    pinMode(this->pin, OUTPUT);
}

void Buzzer::beep() {
    tone(this->pin, 1000);
}

void Buzzer::silent() {
    noTone(this->pin);
}


