#include <Arduino.h>
#include "Relay.h"
#include "Ble.h"
#include "Buzzer.h"
#include "CommandController.h"

Ble *ble;
CommandController *commandController;
Buzzer* buzzer;

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
    buzzer = new Buzzer(27);
    buzzer->init();
}

void loop() {
//    digitalWrite(2, HIGH);
//    buzzer->beep();
//    delay(2000);
//    digitalWrite(2, LOW);
//    buzzer->silent();
//    delay(1000);
//    std::string command = "PRINT_ALL";
//    commandController->handleCommand(command);
}