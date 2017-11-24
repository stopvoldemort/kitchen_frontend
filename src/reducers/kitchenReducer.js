export function kitchenReducer(state = {}, action) {

  switch(action.type) {
    case "FETCH_CITIES":
      return {...state, cities: action.payload}
    case "FETCH_KITCHENS":
      return {...state, list: action.payload}
    default:
      return state
  }
}
