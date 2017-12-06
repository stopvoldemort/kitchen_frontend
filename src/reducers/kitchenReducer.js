export function kitchenReducer(state = {
  cities: [],
  list: [],
  pictureList: [],
  reviewList: [],
  selectedKitchen: {},
  selectedKitchenReviews: [],
  selectedKitchenReviewAuthors: [],
  selectedKitchenReservations: [],
  selectedKitchenPictures: [],
  selectedKitchenOwner: {},
  selectedKitchenMessages: [],
  selectedKitchenGuests: [],
  isLoading: false,
  kitchenUpdated: true
}, action) {

  switch(action.type) {
    case "FETCH_CITIES":
      return {...state, cities: action.payload}

    case "FETCH_KITCHENS":
      return {
        ...state,
        list: action.payload.kitchens,
        pictureList: action.payload.kitchen_pictures,
        reviewList: action.payload.kitchen_reviews,
        isLoading: false
      }

    case "LOADING_KITCHENS":
      return {...state, isLoading: true}

    case "FETCH_KITCHEN":
      const data = action.payload
      return {
        ...state,
        selectedKitchen: data.selected_kitchen,
        selectedKitchenReviews: data.selected_kitchen_reviews,
        selectedKitchenReviewAuthors: data.selected_kitchen_review_authors,
        selectedKitchenReservations: data.selected_kitchen_reservations,
        selectedKitchenPictures: data.selected_kitchen_pictures,
        selectedKitchenOwner: data.selected_kitchen_owner,
        selectedKitchenMessages: data.selected_kitchen_messages,
        selectedKitchenGuests: data.selected_kitchen_guests,
        isLoading: false}

    case "CLEAR_KITCHEN_LIST":
      return {
        ...state,
        list: [],
        pictureList: [],
        reviewList: []
      }

    case "CREATING_KITCHENS":
      return {...state, isLoading: true}

    case "CREATE_KITCHEN":
      return {
        ...state,
        selectedKitchen: action.payload.selected_kitchen,
        selectedKitchenPictures: action.payload.selected_kitchen_pictures,
        selectedKitchenOwner: action.payload.selected_kitchen_owner,
        isLoading: false
      }

    case "CLEAR_KITCHEN":
      return {
        ...state,
        selectedKitchen: {},
        selectedKitchenReviews: [],
        selectedKitchenReviewAuthors: [],
        selectedKitchenReservations: [],
        selectedKitchenPictures: [],
        selectedKitchenOwner: {}
      }

    case "KITCHEN_WILL_UPDATE":
      return {...state, kitchenUpdated: false}

    case "KITCHEN_UPDATED":
      return {...state, kitchenUpdated: true}

    default:
      return state
  }
}
