const BASE_URL = "http://localhost:3000/"

export default class BackendAPI {

  static fetchCities() {
    return fetch(BASE_URL)
      .then(res => res.json())
  }

  static fetchKitchens(searchTerm) {
    const url = `${BASE_URL}/kitchens?query=${searchTerm}`
    return fetch(url)
      .then(res => res.json())
  }

}
