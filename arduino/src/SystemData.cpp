#include "SystemData.h"
#include "Relay.h"
#include "TemperatureSensor.h"
#include "Common.h"


void writeRelayDataToSerial(HardwareSerial *serial) {
    for (int i = 1; i <= COUNT_RELAY; ++i) {
        Relay *pRelay = getRelay(i);
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
     serial->write('\n');
}



