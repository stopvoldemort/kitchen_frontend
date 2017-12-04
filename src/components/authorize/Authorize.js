import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class authorize(RenderedComponent) {
  return class extends Component {

    if (localStorage.getItem('jwt')) {
      return (
        <div>
          <RenderedComponent
        </div>
      )
    } else {
      return (
        <Redirect to="/" />
      )
    }

    render() {

    }

  }
}
