import BackendAPI from '../services/BackendAPI.js'

export function fetchCities() {
  return function(dispatch) {
    BackendAPI.fetchCities()
      .then(json => {
        dispatch({type: "FETCH_CITIES", payload: json}
      )})
  }
}

export function fetchKitchens(searchTerm) {
  return function(dispatch) {
    dispatch({type: "LOADING_KITCHENS"})
    BackendAPI.fetchKitchens(searchTerm)
      .then(json => {
        dispatch({type: "FETCH_KITCHENS", payload: json}
      )})
  }
}
