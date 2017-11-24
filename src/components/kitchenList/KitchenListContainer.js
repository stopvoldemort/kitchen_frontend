import React, { Component } from 'react'
import { connect } from 'react-redux'


class KitchenListContainer extends Component {

  

  render() {
    return (
      <p>i am a kitchen list</p>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return ({
    kitchens: state.kitchens.list
  })
}

export default connect(mapStateToProps)(KitchenListContainer)
