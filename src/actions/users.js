import BackendAPI from '../services/BackendAPI.js'

export function login(email, password) {
  return function(dispatch) {
    BackendAPI.login(email, password)
      .then(json => {
        dispatch({type: "LOGIN", payload: json})
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
