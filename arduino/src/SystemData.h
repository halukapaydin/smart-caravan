#ifndef SMART_CARAVAN_SYSTEMDATA_H
#define SMART_CARAVAN_SYSTEMDATA_H
#include <Arduino.h>

void writeSystemDataToSerial(HardwareSerial *serial);
void writeTemperatureDataToSerial(HardwareSerial *serial);
void writeCleanWaterLevelDataToSerial(HardwareSerial *serial);
void writeGrayWaterLevelDataToSerial(HardwareSerial *serial);
void writeBlackWaterLevelDataToSerial(HardwareSerial *serial);
void writeRelayDataToSerial(HardwareSerial *serial, int relayId);
void writeEndOfRecord(HardwareSerial *serial);
#endif