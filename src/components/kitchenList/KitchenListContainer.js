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
    filters: {
      equipment: {}
    },
    cityLongitude: 0,
    cityLatitude: 0,
    selectedKitchenID: 0
  }

  componentDidMount() {
    this.fetchCityCoordinatesThenFetchKitchens()
  }

  fetchCityCoordinatesThenFetchKitchens = () => {
    const searchTerm = this.props.location.search.split("=")[1].split("%20").join(" ")
    ExternalAPI.geocoder(searchTerm)
      .then(json => {
        const latitude = json.results[0].geometry.location.lat
        const longitude = json.results[0].geometry.location.lng
        this.setState({cityLatitude: latitude, cityLongitude: longitude})
        this.props.fetchKitchens(longitude, latitude)
    })
  }

  importFilters = (filters) => {this.setState({filters: filters})}

  filterKitchens = () => {
    const filters = this.state.filters
    return this.props.kitchens.filter(k => {
      if (
        !(filters.equipment.food_processor && !k.food_processor) &&
        !(filters.equipment.deep_fryer && !k.deep_fryer) &&
        !(filters.equipment.pressure_cooker && !k.pressure_cooker) &&
        !(filters.equipment.standing_mixer && !k.standing_mixer) &&
        !(filters.guests > k.max_guests) &&
        !(filters.min_price > (k.base_price + ((filters.guests - 2) * k.price_per_guest))) &&
        !(filters.max_price < (k.base_price + ((filters.guests - 2) * k.price_per_guest)))
      ) return k
    })
  }

  moveSelectedKitchenToTop = (marker) => {
    this.setState({selectedKitchenID: marker.name})
  }


  render() {
    return (
      <div ref={this.handleContextRef}>
        <Grid padded>
          <Grid.Column className="sticky" width={2}>
            <KitchenFilter importFilters={this.importFilters}/>
          </Grid.Column>
          <Grid.Column width={6}>
            {this.props.isLoading ? <Loading className="col"/> :
              <KitchenList
                selectedKitchenID={this.state.selectedKitchenID}
                kitchenPictures={this.props.kitchenPictures}
                kitchenReviews={this.props.kitchenReviews}
                kitchens={this.filterKitchens()}
              />
            }
          </Grid.Column>
          <Grid.Column width={8}>
            {(!this.state.cityLatitude) ? null :
              <GoogleApiWrapper
              kitchens={this.filterKitchens()}
              cityLatitude={this.state.cityLatitude}
              cityLongitude={this.state.cityLongitude}
              selectKitchen={this.moveSelectedKitchenToTop}
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
    kitchenPictures: state.kitchens.pictureList,
    kitchenReviews: state.kitchens.reviewList,
    isLoading: state.kitchens.isLoading
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchKitchens: (longitude, latitude) => dispatch(fetchKitchens(longitude, latitude))
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(KitchenListContainer)
