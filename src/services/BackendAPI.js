const BASE_URL = "https://radiant-falls-64401.herokuapp.com"
// const BASE_URL = "http://localhost:3000"

const makePostInit = (obj) => {
  return {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      method: "POST",
      body: JSON.stringify(obj)
  }
}

const makePutInit = (obj) => {
  return {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      method: "PUT",
      body: JSON.stringify(obj)
  }
}

const makeDeleteInit = () => {
  return {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    method: "DELETE"
  }
}

const makeGetInit = () => {
  return {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  }
}


export default class BackendAPI {

  static fetchCities() {
    const url = BASE_URL
    const myInit = makeGetInit()
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static fetchKitchens(longitude, latitude) {
    const url = `${BASE_URL}/kitchens?longitude=${longitude}&latitude=${latitude}`
    const myInit = makeGetInit()
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static fetchKitchen(id) {
    const url = `${BASE_URL}/kitchens/${id}`
    const myInit = makeGetInit()
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static login(email, password) {
    const url = `${BASE_URL}/login`
    const myInit = makePostInit({email: email, password: password})
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static refreshUser() {
    const url = `${BASE_URL}/me`
    const myInit = makeGetInit()
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static createReservation(bookObj) {
    const url = `${BASE_URL}/reservations`
    const myInit = makePostInit(bookObj)
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static fetchReservations(userID) {
    const url = `${BASE_URL}/reservations/${userID}`
    const myInit = makeGetInit()
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static cancelReservation(reservationID) {
    const url = `${BASE_URL}/reservations/${reservationID}`
    const myInit = makeDeleteInit()
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static deleteKitchenFromBackend(kitchenID) {
    const url = `${BASE_URL}/kitchens/${kitchenID}`
    const myInit = makeDeleteInit()
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static createUser(userObj) {
    const url = `${BASE_URL}/users`
    const myInit = makePostInit(userObj)
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static createKitchen(kitchenObj) {
    const url = `${BASE_URL}/kitchens`
    const myInit = makePostInit(kitchenObj)
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static createKitchenReview(reviewObj) {
    const url = `${BASE_URL}/kitchen_reviews`
    const myInit = makePostInit(reviewObj)
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static editKitchen(kitchenObj) {
    const url = `${BASE_URL}/kitchens/${kitchenObj.kitchen.id}`
    const myInit = makePutInit(kitchenObj)
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static createMessage(messageObj) {
    const url = `${BASE_URL}/messages`
    const myInit = makePostInit(messageObj)
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static readMessages(messageIDs) {
    const url = `${BASE_URL}/read_messages`
    const myInit = makePostInit(messageIDs)
    return fetch(url, myInit)
      .then(res => res.json())
  }


}
