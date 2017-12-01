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
      stateWithNewReview.currentUser.reviewed_kitchens.push(action.payload)
      return stateWithNewReview
    case "DELETE_KITCHEN_FROM_CURRENT_USER":
      let stateWithoutDeletedKitchen = JSON.parse(JSON.stringify(state))
      const originalKitchens = stateWithoutDeletedKitchen.currentUser.kitchens.slice()
      const remainingKitchens = originalKitchens.filter(k => (k.id!==action.payload))
      stateWithoutDeletedKitchen.currentUser.kitchens = remainingKitchens
      return stateWithoutDeletedKitchen
    case "EDIT_KITCHEN_FROM_CURRENT_USER":
      let stateWithEditedKitchen = JSON.parse(JSON.stringify(state))
      const editedKitchens = stateWithEditedKitchen.currentUser.kitchens.reduce((agg, k) => {
        if (k.id===action.payload.id) agg.push(action.payload)
        else agg.push(k)
        return agg
      }, [])
      stateWithEditedKitchen.currentUser.kitchens = editedKitchens
      return stateWithEditedKitchen
    default:
      return state
  }
}
