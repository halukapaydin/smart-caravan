#include <main.h>

void handleCommand(int command, HardwareSerial *serial){
    if(command <= 0){
        return;
    }

    if(command >= COMMAND_KEY_1 && command <= COMMAND_KEY_16){
        Relay *pRelay = getRelay(command);
        pRelay->switchRelay();
        writeRelayDataToSerial(serial, command);
        writeEndOfRecord(serial);
        return;
    }

    if(command >= COMMAND_KEY_DATA_SEND_RELAY_1 && command <= COMMAND_KEY_DATA_SEND_RELAY_16){
        writeRelayDataToSerial(serial, command-50);
        writeEndOfRecord(serial);
        return;
    }

    if(command == COMMAND_KEY_DATA_SEND_TEMPERATURE_AND_HUMIDITY){
        writeTemperatureDataToSerial(serial);
        writeEndOfRecord(serial);
        return;
    }

    if(command == COMMAND_KEY_DATA_SEND_ALL){
        writeSystemDataToSerial(serial);
        writeEndOfRecord(serial);
        return;
    }
    if(command == COMMAND_KEY_DATA_RESET_RELAYS){
        resetRelays();
        writeSystemDataToSerial(serial);
        writeEndOfRecord(serial);
        return;
    }
}

void setup() {
    initRelays();
    Serial.begin(9600);
    Serial1.begin(9600);
}

void loop() {

    if (Serial.available() <= 0) {
        return;
    }else{
        int command = Serial.read();
        handleCommand(command, &Serial);
    }
    if (Serial1.available() <= 0) {
        return;
    }else{
        int command = Serial1.read();
        handleCommand(command, &Serial1);
    }

}



