export default class BluetoothDevice{
    private _name : string;
    private _id : string;
    private _rssi : string;
    private _connected : string;



    constructor(name: string = "", id: string = "", rssi: string = "", connected: string = "") {
        this._name = name;
        this._id = id;
        this._rssi = rssi;
        this._connected = connected;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get rssi(): string {
        return this._rssi;
    }

    set rssi(value: string) {
        this._rssi = value;
    }

    get connected(): string {
        return this._connected;
    }

    set connected(value: string) {
        this._connected = value;
    }

    clone() : BluetoothDevice{
        const c = new BluetoothDevice();
        Object.assign(c, this);
        return c;
    }


}