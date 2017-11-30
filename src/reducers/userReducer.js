export function userReducer(state = {
  loggedIn: false,
  loginFail: false,
  signUpFail: false,
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
    case "CREATE_USER":
      const signedUpState = {...state, loggedIn: true, currentUser: action.payload, signUpFail: false}
      return signedUpState
    case "ADD_KITCHEN_REVIEW_TO_CURRENT_USER":
      let stateWithNewReview = {...state}
      state.currentUser.reviewed_kitchens.push(action.payload)
      return stateWithNewReview
    default:
      return state
  }
}
