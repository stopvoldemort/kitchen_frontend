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
    case "FETCH_KITCHEN":
      return {...state, selectedKitchen: action.payload, isLoading: false}
    default:
      return state
  }
}
