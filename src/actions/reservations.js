import BackendAPI from '../services/BackendAPI.js'
import { refreshUser } from './users.js'

export function createReservation(bookObj) {
  return function(dispatch) {
    BackendAPI.createReservation(bookObj)
      .then(json => {
        dispatch(refreshUser())

        dispatch({type: "CREATE_RESERVATION"})
      })
  }
}

export function fetchReservations(userID) {
  return function(dispatch) {
    BackendAPI.fetchReservations(userID)
      .then(json => {
        dispatch({type: "FETCH_RESERVATIONS", payload: json})
      })
  }
}

export function resetNewReservationCreated() {
  return function(dispatch) {dispatch({type: "RESET_NEWRESERVATIONCREATED"})}
}

export function cancelReservation(reservationID) {
  return function(dispatch) {
    BackendAPI.cancelReservation(reservationID)
      .then(json => {
        dispatch(refreshUser())
        // dispatch({type: "CANCEL_RESERVATION", payload: reservationID})
      })
  }
}
