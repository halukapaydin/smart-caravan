#ifndef BLE_H
#define BLE_H

#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <functional>
#define SERVICE_UUID        "0000FFE0-0000-1000-8000-00805F9B34FB"
#define CHARACTERISTIC_UUID "0000FFE1-0000-1000-8000-00805F9B34FB"
class Ble {
public:
    Ble(const std::string& deviceName);

    Ble();

    void start();
    void setValue(const std::string& newValue);
    class BleCommandCallback{
    public:
        virtual void onCommand(std::string& command);
    };

    BleCommandCallback* commandCallback;
private:
    BLECharacteristic* pCharacteristic;
    std::string deviceName;
    void initBLE();

};


#endif // BLE_H
