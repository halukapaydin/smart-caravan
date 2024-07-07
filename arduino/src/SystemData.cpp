#include "SystemData.h"
#include "Relay.h"
#include "TemperatureSensor.h"
#include "LevelSensor.h"
#include "Common.h"


void writeRelayDataToSerial(HardwareSerial *serial, int relayId) {
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
void writeCleanWaterLevelDataToSerial(HardwareSerial *serial) {
    LevelSensor *pCleanLevelSensor = getCleanWaterSensor();
    pCleanLevelSensor->read();
    pCleanLevelSensor->write(serial);
}
void writeGrayWaterLevelDataToSerial(HardwareSerial *serial) {
    LevelSensor *pGrayLevelSensor = getGrayWaterSensor();
    pGrayLevelSensor->read();
    pGrayLevelSensor->write(serial);
}
void writeBlackWaterLevelDataToSerial(HardwareSerial *serial) {
    LevelSensor *pBlackLevelSensor = getBlackWaterSensor();
    pBlackLevelSensor->read();
    pBlackLevelSensor->write(serial);
}

void writeSystemDataToSerial(HardwareSerial *serial) {
    for (int i = DATA_KEY_RELAY_1; i < DATA_KEY_RELAY_16; ++i) {
        writeRelayDataToSerial(serial, i);
    }
    writeTemperatureDataToSerial(serial);
    writeCleanWaterLevelDataToSerial(serial);
    writeGrayWaterLevelDataToSerial(serial);
    writeBlackWaterLevelDataToSerial(serial);
}

void writeEndOfRecord(HardwareSerial *serial) {
    serial->write(ENF_OF_RECORD);
}



