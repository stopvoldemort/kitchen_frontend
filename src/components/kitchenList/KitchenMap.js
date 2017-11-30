import React, { Component } from 'react'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import cuid from 'cuid'

export class KitchenMap extends Component {

  markers = () => {
    return this.props.kitchens.reduce((agg, kitchen) => {
      if (kitchen.longitude && kitchen.latitude) {
        const newMarker = <Marker
          key={cuid()}
          name={kitchen.id}
          position={{lat: kitchen.latitude, lng: kitchen.longitude}}
          onClick={this.props.selectKitchen}
          />
        return [...agg, newMarker]
      } else return agg
    }, [])
  }

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={11}
          style={{width: '100%', height: '500px'}}
          initialCenter={{
            lat: this.props.cityLatitude,
            lng: this.props.cityLongitude
          }}
          >
          {this.markers()}
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAZ15pKC2voMB4vV9Hm3hj910Hf76BUAtM"
})(KitchenMap)
