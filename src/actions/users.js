import BackendAPI from '../services/BackendAPI.js'

export function login(email, password) {
  return function(dispatch) {
    BackendAPI.login(email, password)
      .then(json => {
        if (!json.error) {
          localStorage.setItem("jwt", json.jwt)
          dispatch({type: "LOGIN", payload: json.response})
        } else dispatch({type: "LOGIN_FAILED"})
      })
  }
}

export function refreshUser() {
  return function(dispatch) {
    return BackendAPI.refreshUser()
      .then(json => {
        if (!json.error) dispatch({type: "LOGIN", payload: json})
      })
  }
}

export function logout() {
  localStorage.removeItem('jwt')
  return function(dispatch) {
    dispatch({type: "LOGOUT"})
  }
}

export function createUser(userObj) {
  return function(dispatch) {
    BackendAPI.createUser(userObj)
      .then(json => {
        if (!json.error) {
          localStorage.setItem("jwt", json.jwt)
          dispatch({type: "LOGIN", payload: json.response})
        } else dispatch({type: "SIGNUP_FAILED"})
      })
  }
}

export function addKitchenReviewToCurrentUser(reviewObj) {
  return function(dispatch) {
    dispatch({type: "ADD_KITCHEN_REVIEW_TO_CURRENT_USER", payload: reviewObj.kitchen_review})
  }
}

export function deleteKitchenFromCurrentUser(kitchenID) {
  return function(dispatch) {
    dispatch({type: "DELETE_KITCHEN_FROM_CURRENT_USER", payload: kitchenID})
  }
}
