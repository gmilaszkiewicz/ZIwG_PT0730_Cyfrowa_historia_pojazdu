import { CHOOSE_TAB, CHOOSE_CAR, CHANGE_SNACKBAR_STATUS } from "../constans/redux-cons";

const initialState = {
  chosenTab: undefined,
  chosenCar: {},
};

function rootReducer(state = initialState, action) {
  if (action.type === CHOOSE_TAB) {
    return {
      ...state,
      chosenTab: action.payload
  }}
  else if(action.type === CHOOSE_CAR){
    return {
      ...state,
      chosenCar: action.payload
    }
  }
  return state;
}

export default rootReducer;