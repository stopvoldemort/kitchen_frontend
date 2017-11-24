export function kitchenReducer(state = {
  cities: [],
  list: [],
  selectedKitchen: {},
  isLoading: false
}, action) {

  switch(action.type) {
    case "FETCH_CITIES":
      return {...state, cities: action.payload}
    case "FETCH_KITCHENS":
      return {...state, list: action.payload, isLoading: false}
    case "LOADING_KITCHENS":
      return {...state, isLoading: true}
    default:
      return state
  }
}
