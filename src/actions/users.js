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
