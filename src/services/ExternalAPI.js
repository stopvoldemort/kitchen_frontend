export default class ExternalAPI {

  static geocoder(address) {
    const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json"
    const apiParam = "let's not post this here anymore"
    const addressParam = address.replace(/\s+/g, '+')
    const url = baseUrl + "?address=" + addressParam + "&key=" + apiParam
    return fetch(url)
      .then(res => res.json())
  }

}
