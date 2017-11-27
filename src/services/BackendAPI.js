const BASE_URL = "http://localhost:3000/"

const makePostInit = (bodyObj) => {
  return {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(bodyObj)
  }
}



export default class BackendAPI {

  static fetchCities() {
    return fetch(BASE_URL)
      .then(res => res.json())
  }

  static fetchKitchens(searchTerm) {
    const url = `${BASE_URL}kitchens?query=${searchTerm}`
    return fetch(url)
      .then(res => res.json())
  }

  static fetchKitchen(id) {
    const url = `${BASE_URL}kitchens/${id}`
    return fetch(url)
      .then(res => res.json())
  }

  static login(email, password) {
    const url = `${BASE_URL}login`
    const myInit = makePostInit({email: email, password: password})
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static logout() {
    const url = `${BASE_URL}logout`
    return fetch(url)
      .then(res => res.json())
  }

  static createReservation(bookObj) {
    const url = `${BASE_URL}reservations`
    const myInit = makePostInit(bookObj)
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static fetchReservations(userID) {
    const url = `${BASE_URL}reservations/${userID}`
    return fetch(url)
      .then(res => res.json())
  }

  static createUser(userObj) {
    const url = `${BASE_URL}users`
    const myInit = makePostInit(userObj)
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static createKitchen(kitchenObj) {
    const url = `${BASE_URL}kitchens`
    const myInit = makePostInit(kitchenObj)
    return fetch(url, myInit)
      .then(res => res.json())
  }

}
