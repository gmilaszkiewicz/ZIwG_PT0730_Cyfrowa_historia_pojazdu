import {CHOOSE_TAB, CHOOSE_CAR} from "../constans/redux-cons"

export function chooseTab(payload){
    return { type: CHOOSE_TAB, payload}
}

export function chooseCar(payload){
    return { type: CHOOSE_CAR, payload}
}
