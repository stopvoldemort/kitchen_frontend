import BackendAPI from '../services/BackendAPI.js'
import { refreshUser } from './users.js'

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
        dispatch(refreshUser())
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

export function deleteKitchenFromBackend(kitchenID) {
  return function(dispatch) {
    BackendAPI.deleteKitchenFromBackend(kitchenID)
      .then(json => {
        dispatch({type: "DELETE_KITCHEN_FROM_FRONTEND"})
      }
    )
  }
}

export function editKitchen(kitchenObj) {
  return function(dispatch) {
    BackendAPI.editKitchen(kitchenObj)
      .then(json => {
        dispatch(refreshUser())
          .then(() => dispatch({type: "KITCHEN_UPDATED"}))
      }
    )
  }
}

export function clearKitchenList() {
  return function(dispatch) {
    dispatch({type: "CLEAR_KITCHEN_LIST"})
  }
}
