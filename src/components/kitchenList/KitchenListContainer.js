import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchKitchens } from '../../actions/kitchens'
import '../../style/kitchenList.css'
import { KitchenList } from './KitchenList.js'
import { Loading } from './Loading.js'
import { KitchenFilter } from './KitchenFilter.js'
import GoogleApiWrapper from './KitchenMap.js'
import { Grid } from 'semantic-ui-react'


class KitchenListContainer extends Component {

  state = {filters: []}

  componentDidMount() {
    const searchTerm = this.props.location.search.split("=")[1].split("%20").join(" ")
    this.props.fetchKitchens(searchTerm)
  }

  importFilters = (equipment) => {
    let filters = []
    for (var e in equipment) {
      if (equipment[e]) filters.push(e)
    }
    this.setState({filters: filters})
  }

  filterKitchens = () => {
    let filteredKitchens = this.props.kitchens.slice()
    this.state.filters.forEach(filter => {
      filteredKitchens = filteredKitchens.filter(kitchen => (kitchen[filter]))
    })
    return filteredKitchens
  }

  render() {
    return (
      <Grid padded>
        <Grid.Column width={2}>
          <KitchenFilter importFilters={this.importFilters}/>
        </Grid.Column>
        <Grid.Column width={6}>
          {this.props.isLoading ? <Loading className="col"/> : <KitchenList kitchens={this.filterKitchens()}/>}
        </Grid.Column>
        <Grid.Column width={8}>
          <GoogleApiWrapper  kitchens={this.filterKitchens()}/>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    kitchens: state.kitchens.list,
    isLoading: state.kitchens.isLoading
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchKitchens: (searchTerm) => dispatch(fetchKitchens(searchTerm))
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(KitchenListContainer)
