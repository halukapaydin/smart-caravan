//
// Created by haluk on 10/31/24.
//

#ifndef ESP32_BUZZER_H
#define ESP32_BUZZER_H


class Buzzer {
private:
    int pin;
public:
    Buzzer(int pin);
    void beep();
    void silent();
    void init();
};


#endif //ESP32_BUZZER_H
