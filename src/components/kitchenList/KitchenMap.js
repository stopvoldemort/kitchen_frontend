import React, { Component } from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react';


export class KitchenMap extends Component {


  markers = () => {
    return <p>hi</p>
  }

  render() {
    console.log(this.props);
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={{width: '100%', height: '100%'}}
        >


      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAZ15pKC2voMB4vV9Hm3hj910Hf76BUAtM"
})(KitchenMap)
