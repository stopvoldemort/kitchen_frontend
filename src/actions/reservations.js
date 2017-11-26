import BackendAPI from '../services/BackendAPI.js'

export function createReservation(bookObj) {
  return function(dispatch) {
    BackendAPI.createReservation(bookObj)
      .then(json => {
        dispatch({type: "CREATE_RESERVATION"})
      })
  }
}
