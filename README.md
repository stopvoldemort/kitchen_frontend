# Kitchen Frontend

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Packages added

* 'react-redux'
* 'redux'
* 'redux-devtools'
* 'react-router-dom'
* 'semantic-ui-react'
* 'semantic-ui-css'
* 'redux-thunk'



## State

state = {
  kitchens: {
    list: [array of kitchen objects meeting search parameters],
    selected: {kitchenID}  
    },
  users: {
    selected: {user object}
  },
  reservations: {
    reservations: [array of reservation objects belonging to a user],
    selectedReservation: {reservationID}
  },
  kitchenReviews: {
    list: [array of review objects for selected kitchen]
  },
  guestReviews: {
    list: [array of review objects for selected guest]
  }
}
