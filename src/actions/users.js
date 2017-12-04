import BackendAPI from '../services/BackendAPI.js'

export function login(email, password) {
  return function(dispatch) {
    BackendAPI.login(email, password)
      .then(json => {
        if (!json.error) {
          localStorage.setItem("jwt", json.jwt)
          dispatch({type: "LOGIN", payload: json.current_user})
        } else dispatch({type: "LOGIN_FAILED"})
      })
  }
}

export function autoLogin() {
  return function(dispatch) {
    BackendAPI.autoLogin()
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
          dispatch({type: "LOGIN", payload: json.current_user})
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

// export function editKitchenFromCurrentUser(kitchenObj) {
//   return function(dispatch) {
//     dispatch({type: "EDIT_KITCHEN_FROM_CURRENT_USER", payload: kitchenObj.kitchen})
//   }
// }
