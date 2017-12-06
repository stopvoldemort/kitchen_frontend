import React, { Component } from 'react'
import { connect } from 'react-redux'
import { KitchenList } from '../kitchenList/KitchenList.js'
import { Grid, Header } from 'semantic-ui-react'
import { deleteKitchenFromBackend, fetchKitchen } from '../../actions/kitchens.js'
import { deleteKitchenFromCurrentUser } from '../../actions/users.js'
import { MyKitchensReservationList } from './MyKitchensReservationList.js'

class MyKitchensContainer extends Component {

  deleteKitchen = (kitchenID) => {
    this.props.deleteKitchenFromBackend(kitchenID)
    this.props.deleteKitchenFromCurrentUser(kitchenID)
  }

  clickedShowReservations = (kitchen) => {
    this.props.fetchKitchen(kitchen.id)
    window.scrollTo(0, 0)
  }

  messagesButtonClicked = (reservationID) => {
    console.log(`You want to see messages for reservation number ${reservationID}`);
  }

  render() {
    return (
      <Grid padded>
        <Grid.Column width={1}>
        </Grid.Column>
        <Grid.Column width={7}>
          {(!this.props.currentUser.id) ? <p>You must be logged in to see your kitchens</p> : (
            (!this.props.kitchens.length) ?
              <div>
                <p>You do not have any kitchens.</p>
                <br/>
              </div> : (
              <div>
                <br/>
                <Header textAlign='center' as="h1">My Kitchens</Header>
                <br/><br/>
                <KitchenList
                  kitchens={this.props.kitchens}
                  kitchenPictures={this.props.kitchenPictures}
                  kitchenReviews={this.props.kitchenReviews}
                  currentUser={true}
                  deleteKitchen={this.deleteKitchen}
                  clickedShowReservations={this.clickedShowReservations}
                />
              </div>
            )
          )}
        </Grid.Column>
        <Grid.Column width={7}>
          <div>
            <br/>
            <Header textAlign='center' as="h1">
              {(!this.props.selectedKitchen.title) ? null : `Reservations for "${this.props.selectedKitchen.title}"`}
            </Header>
            <br/><br/>
            <MyKitchensReservationList
              selectedKitchen={this.props.selectedKitchen}
              selectedKitchenMessages={this.props.selectedKitchenMessages}
              selectedKitchenReservations={this.props.selectedKitchenReservations}
              selectedKitchenGuests={this.props.selectedKitchenGuests}
              messagesButtonClicked={this.messagesButtonClicked}
              currentUser={this.props.currentUser}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={1}>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    kitchens: state.user.usersKitchens,
    kitchenPictures: state.user.usersKitchensPictures,
    kitchenReviews: state.user.usersKitchensReviews,
    isLoading: state.kitchens.isLoading,
    selectedKitchen: state.kitchens.selectedKitchen,
    selectedKitchenReservations: state.kitchens.selectedKitchenReservations,
    selectedKitchenMessages: state.kitchens.selectedKitchenMessages,
    selectedKitchenGuests: state.kitchens.selectedKitchenGuests
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    deleteKitchenFromBackend: (kitchenID) => dispatch(deleteKitchenFromBackend(kitchenID)),
    deleteKitchenFromCurrentUser: (kitchenID) => dispatch(deleteKitchenFromCurrentUser(kitchenID)),
    fetchKitchen: (kitchenID) => dispatch(fetchKitchen(kitchenID))
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(MyKitchensContainer)
