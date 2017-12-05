export function reservationReducer(state = {
  list: [],
  kitchens: [],
  kitchenPics: [],
  newReservationCreated: false
}, action) {
  switch (action.type) {
    case "CREATE_RESERVATION":
      const newReservationState = {...state, newReservationCreated: true}
      return newReservationState

    case "RESET_NEWRESERVATIONCREATED":
      const resetState = {...state, newReservationCreated: false}
      return resetState

    default:
      return state
  }
}
