export default class BackendAPI {

  static fetchCities() {
    return fetch("http://localhost:3000/")
      .then(res => res.json())
  }

  static fetchKitchens() {
    return fetch("http://localhost:3000/kitchens")
      .then(res => res.json())
  }

}
