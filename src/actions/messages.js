import BackendAPI from '../services/BackendAPI.js'
import { refreshUser } from './users.js'

export function createMessage(messageObj) {
  return function(dispatch) {
    BackendAPI.createMessage(messageObj)
      .then(json => {
        dispatch({type: "ADD_MESSAGE_TO_USERSSENTMESSAGES", payload: json})
      })
  }
}

export function readMessages(messageIDs) {
  return function(dispatch) {
    BackendAPI.readMessages(messageIDs)
      .then(json => {
        dispatch(refreshUser())
      })
  }
}
