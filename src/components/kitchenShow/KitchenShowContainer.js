import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchKitchen } from '../../actions/kitchens'
import { Loading } from '../kitchenList/Loading.js'
import { HostCard } from './HostCard.js'
import { KitchenShowHeader } from './KitchenShowHeader.js'
import { KitchenInfo } from './KitchenInfo.js'
import KitchenAvailability from './KitchenAvailability.js'


class KitchenShowContainer extends Component {

  componentDidMount = () => {
    const id = this.props.location.pathname.split("/")[2]
    this.props.fetchKitchen(id)
  }

  render() {
    return (
      <div>
        {(!this.props.kitchen.title) ? <Loading /> :
          <div>
            <KitchenShowHeader kitchen={this.props.kitchen} />
            <div className="kitchen-show-container row">
              <div className="col-1" >
                <HostCard host={this.props.kitchen.owner} />
              </div>
              <div className="col-2" >
                <KitchenInfo kitchen={this.props.kitchen} />
              </div>
              <div className="col-3">
                <KitchenAvailability kitchen={this.props.kitchen}/>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    kitchen: state.kitchens.selectedKitchen,
    isLoading: state.kitchens.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({fetchKitchen: (id) => dispatch(fetchKitchen(id))})
}

export default connect(mapStateToProps, mapDispatchToProps)(KitchenShowContainer)
