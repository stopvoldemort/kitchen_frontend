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
    case "CANCEL_RESERVATION":
      const newReservations = state.list.filter(res => res.id!==action.payload)
      const lesserState = {...state, list: newReservations}
      return lesserState
    default:
      return state
  }
}
