#include "SystemData.h"
#include "Relay.h"
#include "TemperatureSensor.h"
#include "Common.h"


void writeRelayDataToSerial(HardwareSerial *serial, int *relayId) {
    Relay *pRelay = getRelay(relayId);
    if (pRelay != nullptr) {
        pRelay->write(serial);
    }

}

void writeTemperatureDataToSerial(HardwareSerial *serial) {
    TemperatureSensor *pTemperatureSensor = getTemperatureSensor1();
    pTemperatureSensor->read();
    pTemperatureSensor->write(serial);
}

void writeSystemDataToSerial(HardwareSerial *serial) {
    writeRelayDataToSerial(serial);
    writeTemperatureDataToSerial(serial);
}

void writeEndOfRecord(HardwareSerial *serial) {
    serial->write(ENF_OF_RECORD);
}



