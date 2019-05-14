import { CHOOSE_TAB, CHOOSE_CAR } from "../constans/redux-cons";

const initialState = {
  chosenTab: 0,
  chosenCar: {}
};

function rootReducer(state = initialState, action) {
  if (action.type === CHOOSE_TAB) {
    return {
      ...state,
      chosenTab: action.payload
  }}
  else if(action.type === CHOOSE_CAR){
      console.log(action)
    return {
      ...state,
      chosenCar: action.payload
    }
  }
  return state;
}

export default rootReducer;