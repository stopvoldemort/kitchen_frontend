export function userReducer(state = {
  loggedIn: false,
  loginFail: false,
  currentUser: {}
}, action) {
  switch (action.type) {
    case "LOGIN":
      const loggedInState = {...state, loggedIn: true, currentUser: action.payload, loginFail: false}
      return loggedInState
    case "LOGIN_FAILED":
      const failedStated = {...state, loginFail: true}
      return failedStated
    case "RESET_LOGIN_FAIL":
      const resetState = {...state, loginFail: false}
      return resetState
    case "LOGOUT":
      const newState = {...state, loggedIn: false, currentUser: {}}
      return newState
    default:
      return state
  }
}
