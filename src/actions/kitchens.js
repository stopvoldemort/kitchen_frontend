import BackendAPI from '../services/BackendAPI.js'

export function fetchCities() {
  return function(dispatch) {
    BackendAPI.fetchCities()
      .then(json => {
        dispatch({type: "FETCH_CITIES", payload: json})
      })
  }
}

export function fetchKitchens(longitude, latitude) {
  return function(dispatch) {
    dispatch({type: "LOADING_KITCHENS"})
    BackendAPI.fetchKitchens(longitude, latitude)
      .then(json => {
        dispatch({type: "FETCH_KITCHENS", payload: json})
      })
  }
}

export function fetchKitchen(id) {
  return function(dispatch) {
    dispatch({type: "LOADING_KITCHENS"})
    BackendAPI.fetchKitchen(id)
      .then(json => {
        dispatch({type: "FETCH_KITCHEN", payload: json})
      }
    )
  }
}

export function createKitchen(kitchenObj) {
  return function(dispatch) {
    dispatch({type: "CREATING_KITCHEN"})
    BackendAPI.createKitchen(kitchenObj)
      .then(json => {
        dispatch({type: "CREATE_KITCHEN", payload: json})
      }
    )
  }
}

export function clearKitchen() {
  return function(dispatch) {
    dispatch({type: "CLEAR_KITCHEN"})
  }
}
