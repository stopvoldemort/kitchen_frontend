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
    case "CREATING_KITCHENS":
      return {...state, isLoading: true}
    case "CREATE_KITCHEN":
      return {...state, selectedKitchen: action.payload, isLoading: false}
    case "CLEAR_KITCHEN":
      return {...state, selectedKitchen: {}}
    case "DELETE_KITCHEN_FROM_FRONTEND":
      return state
    case "EDIT_KITCHEN_ON_BACKEND":
      return state
    default:
      return state
  }
}
