const BASE_URL = "http://localhost:3000/"

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
    const myInit = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({email: email, password: password})
    }
    return fetch(url, myInit)
      .then(res => res.json())
  }

  static logout() {
    const url = `${BASE_URL}logout`
    return fetch(url)
      .then(res => res.json())
  }

}
