import {
    faBars,
    faBed,
    faBoltLightning,
    faCouch,
    faGear,
    faPowerOff,
    faRepeat,
    faRestroom,
    faRightToBracket,
    faShower,
    faSink,
    faUtensils
} from '@fortawesome/free-solid-svg-icons'

class RelayAttr {
    icon: any = faGear;
    label: string = "";

    constructor(icon: any, label: string) {
        this.icon = icon;
        this.label = label;
    }
}

const RELAY_ATTRIBUTES: RelayAttr[] = [];
RELAY_ATTRIBUTES[1] = new RelayAttr(faBars, "Kordidor");
RELAY_ATTRIBUTES[2] = new RelayAttr(faCouch, "Koltuk Sağ");
RELAY_ATTRIBUTES[3] = new RelayAttr(faCouch, "Koltuk Sol");
RELAY_ATTRIBUTES[4] = new RelayAttr(faUtensils, "Yemek");
RELAY_ATTRIBUTES[5] = new RelayAttr(faSink, "Mutfak");
RELAY_ATTRIBUTES[6] = new RelayAttr(faShower, "Banyo");
RELAY_ATTRIBUTES[7] = new RelayAttr(faRestroom, "Wc");
RELAY_ATTRIBUTES[8] = new RelayAttr(faBed, "Yatak");
RELAY_ATTRIBUTES[9] = new RelayAttr(faRightToBracket, "Balkon");
RELAY_ATTRIBUTES[10] = new RelayAttr(faBoltLightning, "Dış");
RELAY_ATTRIBUTES[20] = new RelayAttr(faRepeat, "Yenile");
RELAY_ATTRIBUTES[21] = new RelayAttr(faPowerOff, "Hepsini Kapat");

export {
    RELAY_ATTRIBUTES
};
