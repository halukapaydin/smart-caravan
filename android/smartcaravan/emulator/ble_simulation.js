const bleno = require('bleno');

const SERVICE_UUID = 'ffe0'; // HM10 için tipik bir servis UUID'si
const CHARACTERISTIC_UUID = 'ffe1'; // HM10 karakteristik UUID

// Basit bir okuma/yazma karakteristiği
class HM10Characteristic extends bleno.Characteristic {
    constructor() {
        super({
            uuid: CHARACTERISTIC_UUID,
            properties: ['read', 'write', 'notify'],
            value: null
        });
        this._value = Buffer.alloc(0);
    }

    onReadRequest(offset, callback) {
        console.log('Read request received');
        callback(this.RESULT_SUCCESS, this._value);
    }

    onWriteRequest(data, offset, withoutResponse, callback) {
        this._value = data;
        console.log('Write request received:', this._value.toString());
        callback(this.RESULT_SUCCESS);
    }
}

// Bleno başlatma
bleno.on('stateChange', (state) => {
    if (state === 'poweredOn') {
        bleno.startAdvertising('HM10', [SERVICE_UUID]);
    } else {
        bleno.stopAdvertising();
    }
});

bleno.on('advertisingStart', (error) => {
    if (!error) {
        bleno.setServices([
            new bleno.PrimaryService({
                uuid: SERVICE_UUID,
                characteristics: [
                    new HM10Characteristic()
                ]
            })
        ]);
        console.log('BLE simülasyonu başladı');
    } else {
        console.log('Advertising hatası:', error);
    }
});
