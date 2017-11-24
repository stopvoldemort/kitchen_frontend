import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import '../../style/home.css'
import { fetchKitchens } from '../../actions/kitchens'
import { Redirect } from 'react-router-dom'


class SearchForm extends Component {

  // Would be good to add autocomplete. I have already passed an array of cities down as a prop

  state = {
    input: "",
    redirectToKitchenList: false
  }

  handleChange = (ev) => {
    this.setState({input: ev.target.value})
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    const searchTerm = this.state.input
    this.props.fetchKitchens(searchTerm)
    this.setState({input: "", redirectToKitchenList: true}, () => console.log(this.state))
  }

  render() {

    return (
      <div className="home-search-container" >
        <form onSubmit={this.handleSubmit}>
          <div className="ui action input">
            <input type="text" onChange={this.handleChange} value={this.state.input} className="home-search" placeholder="Where do you want to cook?" />
            <Button className="teal" value="Search">Search</Button>
          </div>
        </form>
        {this.state.redirectToKitchenList ? <Redirect to="/kitchens"/> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ cities: state.kitchens.cities })

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchKitchens: (searchTerm) => dispatch(fetchKitchens(searchTerm))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
