export function reservationReducer(state = {list: [], newReservationCreated: false}, action) {
  switch (action.type) {
    case "CREATE_RESERVATION":
      const newReservationState = {...state, newReservationCreated: true}
      return newReservationState
    case "RESET_NEWRESERVATIONCREATED":
      const resetState = {...state, newReservationCreated: false}
      return resetState
    case "FETCH_RESERVATIONS":
      const newState = {...state, list: action.payload}
      return newState
    default:
      return state
  }
}
