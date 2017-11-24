import React, { Component } from 'react'
import SearchForm from './SearchForm.js'
import '../../style/home.css'
import { fetchCities } from '../../actions/kitchens'
import { connect } from 'react-redux'

class HomeContainer extends Component {

  componentDidMount() {
    this.props.fetchCities()
  }


  render() {
    return (
      <div className="home-container">
        <SearchForm />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCities: () => {
      dispatch(fetchCities())
    }
  }
}

export default connect(null, mapDispatchToProps)(HomeContainer)
