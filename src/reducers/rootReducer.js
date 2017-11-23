import { kitchenReducer } from './kitchenReducer.js'
import { combineReducers } from 'redux'


export const rootReducer = combineReducers({
  kitchens: kitchenReducer
})
