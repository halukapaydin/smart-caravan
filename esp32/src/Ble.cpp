#include "Ble.h"
#include <Arduino.h>

Ble::Ble(const std::string& deviceName) : deviceName(deviceName) {}

void Ble::start() {
    initBLE();
}

class CharacteristicCallbacks : public BLECharacteristicCallbacks {
private:
    Ble* ble;
public:
    explicit CharacteristicCallbacks(Ble* ble) : ble(ble) {}

    void onWrite(BLECharacteristic *pCharacteristic, esp_ble_gatts_cb_param_t *param) override {
        std::string string = pCharacteristic->getValue();
        ble->commandCallback->onCommand(string);
    }

};

class ServerCallbacks : public BLEServerCallbacks{
    void onConnect(BLEServer* pServer, esp_ble_gatts_cb_param_t *param) override{
        Serial.print("Client connected");
    }
    void onDisconnect(BLEServer* pServer, esp_ble_gatts_cb_param_t *param) override{
        Serial.print("Client disconnected");
        delay(500);
        pServer->startAdvertising();
    }
};

void Ble::initBLE() {
    BLEDevice::init(deviceName);
    BLEServer *pServer = BLEDevice::createServer();
    pServer->setCallbacks(new ServerCallbacks());
    BLEService *pService = pServer->createService(SERVICE_UUID);
    pCharacteristic = pService->createCharacteristic(
            CHARACTERISTIC_UUID,
            BLECharacteristic::PROPERTY_READ |
            BLECharacteristic::PROPERTY_WRITE |
            BLECharacteristic::PROPERTY_NOTIFY
    );
    pCharacteristic->setCallbacks(new CharacteristicCallbacks(this));
    pCharacteristic->addDescriptor(new BLE2902());
    pService->start();
    BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
    pAdvertising->addServiceUUID(SERVICE_UUID);
    pAdvertising->setScanResponse(true);
    pAdvertising->setMinPreferred(0x06);  // functions that help with iPhone connections issue
    pAdvertising->setMinPreferred(0x12);
    BLEDevice::startAdvertising();
}

void Ble::setValue(const std::string &newValue) {
    Serial.print("data will send over ble : ");
    Serial.println(newValue.c_str());
    pCharacteristic->setValue(newValue);
    pCharacteristic->notify();
    Serial.print("data sent : ");
    Serial.println(newValue.c_str());
}


