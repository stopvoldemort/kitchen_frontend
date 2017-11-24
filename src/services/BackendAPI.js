export default class BackendAPI {

  static fetchCities() {
    return fetch("http://localhost:3000/")
      .then(res => res.json())
  }

  static fetchKitchens(searchTerm) {
    let data = new FormData();
    data.append("city", searchTerm);
    return fetch("http://localhost:3000/kitchens", {method: "POST", body: data})
      .then(res => res.json())
  }

}
