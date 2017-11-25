import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchKitchens } from '../../actions/kitchens'
import '../../style/kitchenList.css'
import { KitchenList } from './KitchenList.js'
import { Loading } from './Loading.js'
import { KitchenFilter } from './KitchenFilter.js'
import { KitchenMap } from './KitchenMap.js'


class KitchenListContainer extends Component {

  state = {filters: []}

  componentDidMount() {
    const searchTerm = this.props.location.search.split("=")[1].split("%20").join(" ")
    this.props.fetchKitchens(searchTerm)
  }

  importFilters = (equipment) => {
    let filters = []
    for (var e in equipment) {
      equipment[e] ? filters.push(e) : null
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
      <div className="kitchen-list-container row">
        <div className="col-1" >
          <KitchenFilter importFilters={this.importFilters}/>
        </div>
        <div className="col-2" >
          {this.props.isLoading ? <Loading className="col"/> : <KitchenList className="col" kitchens={this.filterKitchens()}/>}
        </div>
        <div className="col-3">
          <KitchenMap />
        </div>
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
