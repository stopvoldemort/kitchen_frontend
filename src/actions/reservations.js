import BackendAPI from '../services/BackendAPI.js'

export function createReservation(bookObj) {
  return function(dispatch) {
    BackendAPI.createReservation(bookObj)
      .then(json => {
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
