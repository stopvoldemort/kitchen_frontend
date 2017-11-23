import BackendAPI from '../services/BackendAPI.js'

export function fetchKitchens() {
  return function(dispatch) {
    BackendAPI.fetchKitchens()
      .then(json => console.log(json))
      // .then(json => {
      //   dispatch({type: "FETCH_CITIES", payload: json}
      // )})
  }
}
