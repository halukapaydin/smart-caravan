#ifndef RELAY_H
#define RELAY_H

#include <string>

class Relay {
private:
    uint8_t pin;
    int id;
    int state;
public:
    Relay(uint8_t pin, int id);

    virtual void init();

    virtual void switchOff();

    virtual void switchOn();

    virtual std::string toString() const;

    virtual int getPin() const;

    virtual int getId() const;

    virtual int getState() const;
};

#endif // RELAY_H
