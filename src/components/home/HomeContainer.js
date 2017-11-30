import React, { Component } from 'react'
import SearchForm from './SearchForm.js'
import '../../style/home.css'
import { fetchCities } from '../../actions/kitchens'
import { connect } from 'react-redux'

class HomeContainer extends Component {

  componentDidMount() {this.props.fetchCities()}

  populateCitiesArr = () => {
    const arr = []
    for (let i=0; i<10; i++) {
      const j = Math.floor(Math.random() * this.props.cities.length)
      const city = this.props.cities[j]
      let capitalizedCity = "New York"
      if (city) {
        capitalizedCity = city.toLowerCase().split(' ').map(function(word) {
          return word[0].toUpperCase() + word.substr(1);
        }).join(' ')
        arr.push(capitalizedCity)
      }
    }
    return arr
  }

  render() {
    const cityArr = this.populateCitiesArr()

    return (
      <div className="home-container">
        <SearchForm />
        <section className="animation-box">
          <div className="first-text">{cityArr[0]}</div>
          <div className="second-text">{cityArr[1]}</div>
          <div className="third-text">{cityArr[2]}</div>
          <div className="fourth-text">{cityArr[3]}</div>
          <div className="fifth-text">{cityArr[4]}</div>
          <div className="sixth-text">{cityArr[5]}</div>
          <div className="seventh-text">{cityArr[6]}</div>
          <div className="eighth-text">{cityArr[7]}</div>
          <div className="ninth-text">{cityArr[8]}</div>
          <div className="tenth-text">{cityArr[9]}</div>
        </section>
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

function mapStateToProps(state) {
  return {
    cities: state.kitchens.cities
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
