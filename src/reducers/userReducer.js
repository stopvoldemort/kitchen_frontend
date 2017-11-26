export function userReducer(state = {
  loggedIn: false,
  currentUser: {}
}, action) {
  switch (action.type) {
    case "LOGIN":
      if (action.payload.id) {
        const newState = {...state, loggedIn: true, currentUser: action.payload}
        return newState
      } else {
        return state
      }
    case "LOGOUT":
      const newState = {...state, loggedIn: false, currentUser: {}}
      return newState
    default:
      return state
  }
}
