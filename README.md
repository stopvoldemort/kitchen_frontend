# Welcome To CounterSpace.

This is the frontend for Counterspace, my final project for the Flatiron School's software engineering program. It is not a "real" website -- the kitchens and users are randomly seeded, and not based on real people or places.

Demonstration: https://youtu.be/x639Y-InrX8

The repository for the backend can be found here: https://github.com/stopvoldemort/counterspace-backend.

## Description

Love to cook for a large group, but don't have the space in your apartment? This web application allows you to rent large, well-stocked kitchens and beautiful dining rooms from others who have more space than they are using.

Guests are able to search for kitchens by location, book reservations, message their host, and leave reviews. Kitchen owners are able to easily manage their reservations and message with their guests.

## Technologies

* 'react-redux'
* 'react-router-dom'
* 'redux'
* 'redux-thunk'
* 'redux-devtools'
* 'react-datepicker'
* 'react-stars'
* 'react-dropzone'
* 'google-maps-react'
* 'semantic-ui-react'
* 'cuid'
* 'moment'
* 'superagent'

## State
```
state = {
  kitchens: {
    cities: [array of city names],
    list: [array of kitchen objects],
    pictureList: [array of urls to pictures],
    reviewList: [array of all reviews],
    selectedKitchen: {kitchen object},
    selectedKitchenReviews: [array of selected kitchen's reviews],
    selectedKitchenReviewAuthors: [array of the authors of selected kitchen's reviews],
    selectedKitchenReservations: [array of the reservations for a selected kitchen],
    selectedKitchenPictures: [array of the pictures for a selected kitchen],
    selectedKitchenOwner: {user object},
    selectedKitchenMessages: [array of the messages for a selected kitchen],
    selectedKitchenGuests: [array of user objects],
    isLoading: boolean,
    kitchenUpdated: boolean
  },
  users: {
    currentUser: {user object},
    usersKitchens: [array of current user's kitchens],
    usersKitchensPictures: [array of pictures of current user's kitchens],
    usersKitchensReviews: [array of reviews of current user's kitchens],
    usersKitchensReservations: [array of reservations of current user's kitchens],
    usersReviews: [array of current user's reviews],
    usersReservations: [array of current user's reservations],
    usersSentMessages: [array of current user's sent messages],
    usersReceivedMessages: [array of current user's received messages],
    usersReservationsKitchens: [array of kitchen objects where the current user has reservations],
    usersReservationsKitchensPictures: [array of picture urls of where the current user has reservations],
    loggedIn: boolean,
    loginFail: boolean,
    signUpFail: boolean
  }
}
```
