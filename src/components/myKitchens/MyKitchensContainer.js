import React, { Component } from 'react'
import { connect } from 'react-redux'
import { KitchenList } from '../kitchenList/KitchenList.js'
import { Grid, Header } from 'semantic-ui-react'
import { deleteKitchenFromBackend, fetchKitchen, clearKitchen } from '../../actions/kitchens.js'
import { deleteKitchenFromCurrentUser } from '../../actions/users.js'
import MyKitchensReservationList from './MyKitchensReservationList.js'
import { createMessage, readMessages } from '../../actions/messages.js'


class MyKitchensContainer extends Component {

  componentWillUnmount = () => {this.props.clearKitchen()}

  deleteKitchen = (kitchenID) => {
    this.props.deleteKitchenFromBackend(kitchenID)
    this.props.deleteKitchenFromCurrentUser(kitchenID)
  }


  clickedShowReservations = (kitchen) => {
    this.props.fetchKitchen(kitchen.id)
    window.scrollTo(0, 0)
  }

  render() {
    return (
      (!this.props.kitchens.length) ? (
        <div>
          <br/><br/>
          <Header as="h3">You have not yet added your kitchen to CounterSpace.</Header>
          <br/><br/>
        </div>
      ) : (
        <Grid padded>
          <Grid.Column width={1}>
          </Grid.Column>
          <Grid.Column width={6}>
            {(!this.props.currentUser.id) ? <p>You must be logged in to see your kitchens</p> : (
              <div>
                <br/>
                <Header textAlign='center' as="h1">My Kitchens</Header>
                <br/><br/>
                <KitchenList
                  kitchens={this.props.kitchens}
                  kitchenPictures={this.props.kitchenPictures}
                  kitchenReviews={this.props.kitchenReviews}
                  kitchenReservations={this.props.kitchenReservations}
                  receivedMessages={this.props.receivedMessages}
                  currentUser={this.props.currentUser}
                  deleteKitchen={this.deleteKitchen}
                  clickedShowReservations={this.clickedShowReservations}
                />
              </div>
            )}
          </Grid.Column>
          <Grid.Column width={9}>
            <div>
              <br/>
              <Header textAlign='center' as="h1">
                {(!this.props.selectedKitchen.title) ? null : `Reservations for "${this.props.selectedKitchen.title}"`}
              </Header>
              <br/><br/>
              <MyKitchensReservationList
                selectedKitchen={this.props.selectedKitchen}
                receivedMessages={this.props.receivedMessages}
                sentMessages={this.props.sentMessages}
                reservations={this.props.selectedKitchenReservations}
                guests={this.props.selectedKitchenGuests}
                messagesButtonClicked={this.messagesButtonClicked}
                currentUser={this.props.currentUser}
                createMessage={this.props.createMessage}
                readMessages={this.props.readMessages}
              />
            </div>
          </Grid.Column>
        </Grid>
      )
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    receivedMessages: state.user.usersReceivedMessages,
    sentMessages: state.user.usersSentMessages,
    kitchens: state.user.usersKitchens,
    kitchenPictures: state.user.usersKitchensPictures,
    kitchenReviews: state.user.usersKitchensReviews,
    kitchenReservations: state.user.usersKitchensReservations,
    isLoading: state.kitchens.isLoading,
    selectedKitchen: state.kitchens.selectedKitchen,
    selectedKitchenReservations: state.kitchens.selectedKitchenReservations,
    selectedKitchenGuests: state.kitchens.selectedKitchenGuests,
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    deleteKitchenFromBackend: (kitchenID) => dispatch(deleteKitchenFromBackend(kitchenID)),
    deleteKitchenFromCurrentUser: (kitchenID) => dispatch(deleteKitchenFromCurrentUser(kitchenID)),
    fetchKitchen: (kitchenID) => dispatch(fetchKitchen(kitchenID)),
    createMessage: (reservationID) => dispatch(createMessage(reservationID)),
    readMessages: (messageIDs) => dispatch(readMessages(messageIDs)),
    clearKitchen: () => dispatch(clearKitchen())
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(MyKitchensContainer)
