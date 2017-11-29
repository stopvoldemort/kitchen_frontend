export default class ExternalAPI {

  static geocoder(address) {
    const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json"
    const apiParam = "AIzaSyAZ15pKC2voMB4vV9Hm3hj910Hf76BUAtM"
    const addressParam = address.replace(/\s+/g, '+')
    const url = baseUrl + "?address=" + addressParam + "&key=" + apiParam
    return fetch(url)
      .then(res => res.json())
  }


}
