import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import '../../style/home.css'
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
    this.setState({redirectToKitchenList: true})
  }

  searchSubmitted = () => {
    if (this.state.redirectToKitchenList) {
      const path = `/kitchens/?query=${this.state.input}`
      return <Redirect push to={path}/>
    } else {
      return null
    }
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
        {this.searchSubmitted()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ cities: state.kitchens.cities })

export default connect(mapStateToProps)(SearchForm)
