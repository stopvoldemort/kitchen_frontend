export function userReducer(state = {
  currentUser: {},
  usersKitchens: [],
  usersKitchensPictures: [],
  usersKitchensReviews: [],
  usersReviews: [],
  usersReservations: [],
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
        loggedIn: false,
        loginFail: false,
        signUpFail: false
      }
      return loggedOutState

    case "ADD_KITCHEN_REVIEW_TO_CURRENT_USER":
      const newUsersReviews = state.usersReviews.concat(action.payload)
      return {...state, usersReviews: newUsersReviews}

    case "ADD_KITCHEN_TO_CURRENT_USER":
      let newUsersKitchens = state.usersKitchens.concat(action.payload.selected_kitchen)
      let newUsersKitchensPictures = state.usersKitchensPictures.concat(action.payload.selected_kitchen_pictures)
      return {
        ...state,
        usersKitchens: newUsersKitchens,
        usersKitchensPictures: newUsersKitchensPictures
      }

    case "DELETE_KITCHEN_FROM_CURRENT_USER":
      const smallerUsersKitchens = state.usersKitchens.filter(k => (k.id!==action.payload))
      return {
        ...state,
        usersKitchens: smallerUsersKitchens
      }

    case "EDIT_KITCHEN_FROM_CURRENT_USER":
      console.log("state", state, "payload", action.payload);
      let editedUsersKitchens = state.usersKitchens.filter(k => {
        return k.id !== action.payload.selected_kitchen.id
      })
      editedUsersKitchens.push(action.payload.selected_kitchen)
      let editedUsersKitchensPictures = state.usersKitchensPictures.filter(kp => {
        return kp.kitchen_id !== action.payload.selected_kitchen.id
      })
      editedUsersKitchensPictures.push(action.payload.selected_kitchen_pictures[0])
      let editedUsersKitchensReviews = state.usersKitchensReviews.filter(kp => {
        return kp.kitchen_id !== action.payload.selected_kitchen.id
      })
      editedUsersKitchensReviews.push([...action.payload.selected_kitchen_reviews])
      return {
        ...state,
        usersKitchens: editedUsersKitchens,
        usersKitchensPictures: editedUsersKitchensPictures,
        usersKitchensReviews: editedUsersKitchensReviews
      }

    default:
      return state
  }
}
