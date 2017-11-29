import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchKitchens } from '../../actions/kitchens'
import '../../style/kitchenList.css'
import { KitchenList } from './KitchenList.js'
import { Loading } from './Loading.js'
import { KitchenFilter } from './KitchenFilter.js'
import GoogleApiWrapper from './KitchenMap.js'
import { Grid } from 'semantic-ui-react'
import ExternalAPI from '../../services/ExternalAPI.js'

class KitchenListContainer extends Component {

  state = {
    filters: [],
    cityLongitude: 0,
    cityLatitude: 0
  }

  componentDidMount() {
    // const searchTerm = this.props.location.search.split("=")[1].split("%20").join(" ")
    // this.props.fetchKitchens(searchTerm)
    this.props.fetchKitchens()
    this.fetchCityCoordinates()
  }


  fetchCityCoordinates = () => {
    const searchTerm = this.props.location.search.split("=")[1].split("%20").join(" ")
    ExternalAPI.geocoder(searchTerm)
      .then(json => {
        const latitude = json.results[0].geometry.location.lat
        const longitude = json.results[0].geometry.location.lng
        this.setState({cityLatitude: latitude, cityLongitude: longitude})
    })
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
      <div ref={this.handleContextRef}>
        <Grid padded>
          <Grid.Column className="sticky" width={2}>
            <KitchenFilter importFilters={this.importFilters}/>
          </Grid.Column>
          <Grid.Column width={6}>
            {this.props.isLoading ? <Loading className="col"/> : <KitchenList kitchens={this.filterKitchens()}/>}
          </Grid.Column>
          <Grid.Column width={8}>
            {(!this.state.cityLatitude) ? null :
              <GoogleApiWrapper
              kitchens={this.filterKitchens()}
              cityLatitude={this.state.cityLatitude}
              cityLongitude={this.state.cityLongitude}
              />
            }
          </Grid.Column>
        </Grid>
      </div>
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
