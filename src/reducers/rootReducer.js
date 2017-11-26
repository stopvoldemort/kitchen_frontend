import { kitchenReducer } from './kitchenReducer.js'
import { userReducer } from './userReducer.js'
import { combineReducers } from 'redux'


export const rootReducer = combineReducers({
  kitchens: kitchenReducer,
  user: userReducer
})
