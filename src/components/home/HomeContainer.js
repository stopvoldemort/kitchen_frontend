import React, { Component } from 'react'
import SearchForm from './SearchForm.js'
import '../../style/home.css'
import { fetchCities } from '../../actions/kitchens'
import { connect } from 'react-redux'

class HomeContainer extends Component {

  componentDidMount() {this.props.fetchCities()}

  populateCityArr = (n) => {
    const arr = []
    for (let i=0; i<10; i++) {
      const j = Math.floor(Math.random() * n)
      arr.push(this.props.cities[j])
    }
    return arr
  }

  render() {
    const cityArr = this.populateCityArr(this.props.cities.length)

    return (
      <div className="home-container">
        <SearchForm />
        <section className="animation-box">
          <div className="first-text">{this.props.cities[0]}</div>
          <div className="second-text">{this.props.cities[1]}</div>
          <div className="third-text">{this.props.cities[2]}</div>
          <div className="fourth-text">{this.props.cities[3]}</div>
          <div className="fifth-text">{this.props.cities[4]}</div>
          <div className="sixth-text">{this.props.cities[5]}</div>
          <div className="seventh-text">{this.props.cities[6]}</div>
          <div className="eighth-text">{this.props.cities[7]}</div>
          <div className="ninth-text">{this.props.cities[8]}</div>
          <div className="tenth-text">{this.props.cities[9]}</div>
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
