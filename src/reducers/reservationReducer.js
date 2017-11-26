export function reservationReducer(state = {list: []}, action) {
  switch (action.type) {
    case "CREATE_RESERVATION":
      return state
    case "FETCH_RESERVATIONS":
      const newState = {...state, list: action.payload}
      return newState
    default:
      return state
  }
}
