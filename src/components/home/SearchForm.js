import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import '../../style/home.css'
import { fetchKitchens } from '../../actions/kitchens'


class SearchForm extends Component {

  // Would be good to add autocomplete. I have already passed an array of cities down as a prop

  state = {
    input: ""
  }

  handleChange = (ev) => {
    this.setState({input: ev.target.value})
    console.log("props", this.props);
  }

  handleClick = () => {
    // Need to set this up so it passes the search term into fetchKittens()
    this.props.fetchKitchens()
    this.setState({input: ""})
  }

  render() {
    return (
      <div className="home-search-container" >
        <div className="ui action input">
          <input type="text" onChange={this.handleChange} value={this.state.input} className="home-search" placeholder="Where do you want to cook?" />
          <Button className="teal" onClick={this.handleClick} value="Search">Search</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {cities: state.kitchens.cities}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchKitchens: () => dispatch(fetchKitchens())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
