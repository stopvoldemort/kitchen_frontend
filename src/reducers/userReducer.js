export function userReducer(state = {
  currentUser: {},
  usersKitchens: [],
  usersKitchensPictures: [],
  usersKitchensReviews: [],
  usersReviews: [],
  usersReservations: [],
  usersSentMessages: [],
  usersReceivedMessages: [],
  usersReservationsKitchens: [],
  usersReservationsKitchensPictures: [],
  loggedIn: false,
  loginFail: false,
  signUpFail: false
}, action) {

  switch (action.type) {

    case "LOGIN":
      const data = action.payload
      const loggedInState = {
        ...state,
        currentUser: data.user,
        usersKitchens: data.kitchens,
        usersKitchensPictures: data.kitchen_pictures,
        usersReviews: data.kitchen_reviews,
        usersReservations: data.reservations,
        usersKitchensReviews: data.reviews_of_users_kitchens,
        usersSentMessages: data.sent_messages,
        usersReceivedMessages: data.received_messages,
        usersReservationsKitchens: data.reservations_kitchens,
        usersReservationsKitchensPictures: data.reservations_kitchens_pictures,
        loginFail: false,
        loggedIn: true
      }
      return {...loggedInState}

    case "LOGIN_FAILED":
      const failedLogin = {...state, loginFail: true}
      return failedLogin

    case "SIGNUP_FAILED":
      const failedSignup = {...state, signupFail: true}
      return failedSignup

    case "RESET_LOGIN_FAIL":
      const resetLogin = {...state, loginFail: false}
      return resetLogin

    case "RESET_SIGNUP_FAIL":
      const resetSignup = {...state, signupFail: false}
      return resetSignup

    case "LOGOUT":
      const loggedOutState = {
        ...state,
        currentUser: {},
        usersKitchensReviews: [],
        usersKitchens: [],
        usersKitchensPictures: [],
        usersReviews: [],
        usersReservations: [],
        usersSentMessages: [],
        usersReceivedMessages: [],
        usersReservationsKitchens: [],
        usersReservationsKitchensPictures: [],
        loggedIn: false,
        loginFail: false,
        signUpFail: false
      }
      return loggedOutState

    case "ADD_KITCHEN_REVIEW_TO_CURRENT_USER":
      const newUsersReviews = state.usersReviews.concat(action.payload)
      return {...state, usersReviews: newUsersReviews}

    case "DELETE_KITCHEN_FROM_CURRENT_USER":
      const smallerUsersKitchens = state.usersKitchens.filter(k => (k.id!==action.payload))
      return {
        ...state,
        usersKitchens: smallerUsersKitchens
      }

    case "ADD_MESSAGE_TO_USERSSENTMESSAGES":
      const newUsersSentMessages = [...state.usersSentMessages, action.payload]
      return {...state, usersSentMessages: newUsersSentMessages}

    case "READ_MESSAGES":
      const newUsersReceivedMessages = [...state.usersReceivedMessages]
      const readMessages = newUsersReceivedMessages.map(m => m.read=true)
      return {...state, readMessages}
    default:
      return state
  }
}
