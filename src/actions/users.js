import BackendAPI from '../services/BackendAPI.js'

export function login(email, password) {
  return function(dispatch) {
    BackendAPI.login(email, password)
      .then(json => {
        if (json.id) {
          dispatch({type: "LOGIN", payload: json})
        } else {
          dispatch({type: "LOGIN_FAILED"})
        }
      })
  }
}

export function logout() {
  return function(dispatch) {
    BackendAPI.logout()
      .then(json => {
        dispatch({type: "LOGOUT"})
      })
  }
}

export function createUser(userObj) {
  return function(dispatch) {
    BackendAPI.createUser(userObj)
      .then(json => {
        dispatch({type: "CREATE_USER", payload: json})
      })
  }
}

export function addKitchenReviewToCurrentUser(reviewObj) {
  return function(dispatch) {
    dispatch({type: "ADD_KITCHEN_REVIEW_TO_CURRENT_USER", payload: reviewObj.kitchen_review})
  }
}
