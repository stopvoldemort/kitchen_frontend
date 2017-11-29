import React, { Component } from 'react'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';


export class KitchenMap extends Component {


  markers = () => {
    return <p>hi</p>
  }

  mapClicked = (mapProps, map, clickEvent) => {
    console.log(mapProps, map, "click event: ", clickEvent);
  }

  render() {

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={{width: '100%', height: '500px'}}
        initialCenter={{
          lat: 40.854885,
          lng: -88.081807
        }}
        onClick={this.mapClicked}
        >

        <Marker onClick={this.onMarkerClick}
        name={'Current location'} />


      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAZ15pKC2voMB4vV9Hm3hj910Hf76BUAtM"
})(KitchenMap)
