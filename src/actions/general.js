import BackendAPI from '../services/BackendAPI.js'

export function fetchCities() {
  return function(dispatch) {
    BackendAPI.fetchCities()
      .then(json => {
        dispatch({type: "FETCH_CITIES", payload: json}
      )})
  }
}
