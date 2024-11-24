#include <Arduino.h>
#include "Relay.h"
#include "Ble.h"
#include "Buzzer.h"
#include "CommandController.h"

Ble *ble;
CommandController *commandController;

class CommandHandler : public Ble::BleCommandCallback {
    void onCommand(std::string &command) override {
        Serial.print("command : ");
        Serial.println(command.c_str());
        commandController->handleCommand(command);
    }
};

void init() {

}
void setup() {
    Serial.begin(115200);
    ble = new Ble("AVAREYOLCULAR");
    ble->commandCallback = new CommandHandler();
    commandController = new CommandController(*ble);
    delay(1000);
    commandController->init();
    delay(1000);
    ble->start();
    Serial.println("ESP 32 setup finished");
}

void loop() {
    if(Serial.available()){
        std::string command = Serial.readStringUntil('\n').c_str();
        commandController->handleCommand(command);
    }
}