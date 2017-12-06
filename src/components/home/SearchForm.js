import React, { Component } from 'react'
import { Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import '../../style/home.css'
import { Redirect } from 'react-router-dom'
import ExternalAPI from '../../services/ExternalAPI.js'


class SearchForm extends Component {

  state = {
    input: "",
    redirectToKitchenList: false,
    noInput: false,
    invalidAddress: false
  }

  handleChange = (ev) => {this.setState({input: ev.target.value})}

  handleSubmit = (ev) => {
    const address = this.state.input
    ev.preventDefault()
    if (!address) this.setState({noInput: true})
    else {
      ExternalAPI.geocoder(address)
        .then(json => {
          if (json.status==="ZERO_RESULTS") {
            this.setState({invalidAddress: true})
          } else {
            this.setState({redirectToKitchenList: true})
          }
      })
    }
  }

  resetNoInput = () => this.setState({noInput: false})
  resetInvalidAddress = () => this.setState({invalidAddress: false})

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
            <input type="text" size="50" onChange={this.handleChange} value={this.state.input} className="home-search" placeholder="Where do you live?" />
            <Button size="huge" className="blue" value="Search">Search</Button>
          </div>
        </form>
        {this.searchSubmitted()}
        {(this.state.noInput) ? (
          <Message negative onDismiss={this.resetNoInput}>
            <Message.Header>Please enter a location</Message.Header>
          </Message>
        ) : null }
        {(this.state.invalidAddress) ? (
          <Message negative onDismiss={this.resetInvalidAddress}>
            <Message.Header>Please enter a valid location</Message.Header>
          </Message>
        ) : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ cities: state.kitchens.cities })

export default connect(mapStateToProps)(SearchForm)
