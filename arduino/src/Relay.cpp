#include <Relay.h>
#include <Common.h>

Relay *RELAY_1 = new Relay(PIN_RELAY_1, DATA_KEY_RELAY_1);
Relay *RELAY_2 = new Relay(PIN_RELAY_2, DATA_KEY_RELAY_2);
Relay *RELAY_3 = new Relay(PIN_RELAY_3, DATA_KEY_RELAY_3);
Relay *RELAY_4 = new Relay(PIN_RELAY_4, DATA_KEY_RELAY_4);
Relay *RELAY_5 = new Relay(PIN_RELAY_5, DATA_KEY_RELAY_5);
Relay *RELAY_6 = new Relay(PIN_RELAY_6, DATA_KEY_RELAY_6);
Relay *RELAY_7 = new Relay(PIN_RELAY_7, DATA_KEY_RELAY_7);
Relay *RELAY_8 = new Relay(PIN_RELAY_8, DATA_KEY_RELAY_8);
Relay *RELAY_9 = new Relay(PIN_RELAY_9, DATA_KEY_RELAY_9);
Relay *RELAY_10 = new Relay(PIN_RELAY_10, DATA_KEY_RELAY_10);
Relay *RELAY_11 = new Relay(PIN_RELAY_11, DATA_KEY_RELAY_11);
Relay *RELAY_12 = new Relay(PIN_RELAY_12, DATA_KEY_RELAY_12);
Relay *RELAY_13 = new Relay(PIN_RELAY_13, DATA_KEY_RELAY_13);
Relay *RELAY_14 = new Relay(PIN_RELAY_14, DATA_KEY_RELAY_14);
Relay *RELAY_15 = new Relay(PIN_RELAY_15, DATA_KEY_RELAY_15);
Relay *RELAY_16 = new Relay(PIN_RELAY_16, DATA_KEY_RELAY_16);

RelayState reverseState(RelayState &state) {
    return state == ON ? OFF : ON;
}

Relay *getRelay(int command) {
    switch (command) {
        case COMMAND_KEY_1:
            return RELAY_1;
        case COMMAND_KEY_2:
            return RELAY_2;
        case COMMAND_KEY_3:
            return RELAY_3;
        case COMMAND_KEY_4:
            return RELAY_4;
        case COMMAND_KEY_5:
            return RELAY_5;
        case COMMAND_KEY_6:
            return RELAY_6;
        case COMMAND_KEY_7:
            return RELAY_7;
        case COMMAND_KEY_8:
            return RELAY_8;
        case COMMAND_KEY_9:
            return RELAY_9;
        case COMMAND_KEY_10:
            return RELAY_10;
        case COMMAND_KEY_11:
            return RELAY_11;
        case COMMAND_KEY_12:
            return RELAY_12;
        case COMMAND_KEY_13:
            return RELAY_13;
        case COMMAND_KEY_14:
            return RELAY_14;
        case COMMAND_KEY_15:
            return RELAY_15;
        case COMMAND_KEY_16:
            return RELAY_16;
        default:
            return nullptr;
    }
}

void initRelays() {
    for (int i = 0; i < COUNT_RELAY; ++i) {
        Relay *pRelay = getRelay(i + 1);
        pRelay->initRelay();
    }
}

bool handleRelayCommand(int command) {
    Relay *pRelay = getRelay(command);
    if (pRelay != nullptr) {
        pRelay->switchRelay();
        return true;
    }
    return false;
}
