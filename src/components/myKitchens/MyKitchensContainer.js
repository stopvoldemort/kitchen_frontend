import React, { Component } from 'react'
import { connect } from 'react-redux'
import { KitchenList } from '../kitchenList/KitchenList.js'
import { Grid, Button } from 'semantic-ui-react'
import { deleteKitchenFromBackend } from '../../actions/kitchens.js'
import { deleteKitchenFromCurrentUser } from '../../actions/users.js'
import { Link } from 'react-router-dom'

class MyKitchensContainer extends Component {

  deleteKitchen = (kitchenID) => {
    this.props.deleteKitchenFromBackend(kitchenID)
    this.props.deleteKitchenFromCurrentUser(kitchenID)
  }

  render() {
    return (
      <Grid padded>
        <Grid.Column width={4}>
        </Grid.Column>
        <Grid.Column width={8}>
          {(!this.props.currentUser.id) ? <p>You must be logged in to see your kitchens</p> : (
            (!this.props.currentUser.kitchens.length) ? <p>You do not have any kitchens.</p> : (
              <div>
                <br/>
                <Link to="/kitchens/new"><Button size="huge" fluid primary>
                  Add A Kitchen
                </Button></Link>
                <br/><br/><br/>
                <KitchenList
                  kitchens={this.props.currentUser.kitchens}
                  currentUser={true}
                  deleteKitchen={this.deleteKitchen}
                />
              </div>
            )
          )}
        </Grid.Column>
        <Grid.Column width={4}>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    isLoading: state.kitchens.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    deleteKitchenFromBackend: (kitchenID) => dispatch(deleteKitchenFromBackend(kitchenID)),
    deleteKitchenFromCurrentUser: (kitchenID) => dispatch(deleteKitchenFromCurrentUser(kitchenID))
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(MyKitchensContainer)
