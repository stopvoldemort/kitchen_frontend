import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchKitchen, clearKitchen } from '../../actions/kitchens'
import { Loading } from '../kitchenList/Loading.js'
import { HostCard } from './HostCard.js'
import KitchenShowHeader from './KitchenShowHeader.js'
import { KitchenInfo } from './KitchenInfo.js'
import KitchenAvailability from './KitchenAvailability.js'
import { Grid } from 'semantic-ui-react'


class KitchenShowContainer extends Component {

  componentDidMount = () => {
    const id = this.props.location.pathname.split("/")[2]
    this.props.fetchKitchen(id)
  }

  componentWillUnmount = () => {
    this.props.clearKitchen()
  }

  render() {
    return (
      <div>
        {(!this.props.kitchen.id) ? <Loading /> :
          <div>
            <KitchenShowHeader kitchen={this.props.kitchen} />
            <Grid padded>
              <Grid.Row>
                <Grid.Column width={4}>
                  <HostCard host={this.props.kitchen.owner} />
                </Grid.Column>
                <Grid.Column width={8}>
                  <KitchenInfo kitchen={this.props.kitchen} />
                </Grid.Column>
                <Grid.Column width={4}>
                  <KitchenAvailability kitchen={this.props.kitchen}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
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
  return ({
    fetchKitchen: (id) => dispatch(fetchKitchen(id)),
    clearKitchen: () => dispatch(clearKitchen())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(KitchenShowContainer)
