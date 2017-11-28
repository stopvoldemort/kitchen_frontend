import BackendAPI from '../services/BackendAPI.js'

export function createKitchenReview(reviewObj) {
  return function(dispatch) {
    BackendAPI.createKitchenReview(reviewObj)
      .then(json => {
        dispatch({type: "CREATE_KITCHEN_REVIEW"})
      })
  }
}
