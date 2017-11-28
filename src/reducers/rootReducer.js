import { kitchenReducer } from './kitchenReducer.js'
import { userReducer } from './userReducer.js'
import { reservationReducer } from './reservationReducer.js'
import { kitchenReviewReducer } from './kitchenReviewReducer.js'
import { combineReducers } from 'redux'


export const rootReducer = combineReducers({
  kitchenReviews: kitchenReviewReducer,
  kitchens: kitchenReducer,
  user: userReducer,
  reservations: reservationReducer
})
