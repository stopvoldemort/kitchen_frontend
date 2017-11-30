export function kitchenReviewReducer(state = {list: []}, action) {
  switch (action.type) {
    case "CREATE_KITCHEN_REVIEW":
      // Nothing happens here. Instead, the new review is added to the store under currentUser.
      return state
    default:
      return state
  }
}
