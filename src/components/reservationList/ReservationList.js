import React, { Component } from 'react'
import { Header, Grid } from 'semantic-ui-react'
import cuid from 'cuid'
import ReservationCard from './ReservationCard.js'

class ReservationList extends Component {

  bringSelectedToTheTop = (reservationsArray) => {
    const selected = this.props.selectedReservation
    if (selected.id) {
      const index = reservationsArray.findIndex(i => i.id === selected.id)
      if (index!==-1) {
        return[selected]
        // return [selected, ...reservationsArray.slice(0,index), ...reservationsArray.slice(index+1)]
      }
    }
    return reservationsArray
  }

  reservationCards = (reservationsArray, isPrior) => {

    const modReservationsArray = this.bringSelectedToTheTop(reservationsArray)

    return modReservationsArray.map(reservation => (
      <ReservationCard
        key={cuid()}
        reservation={reservation}
        currentUser={this.props.currentUser}
        prior={isPrior}
        cancelReservation={this.props.cancelReservation}
        kitchenPicture={this.props.kitchenPictures.find(pic => {
          return pic.kitchen_id === reservation.kitchen_id
        })}
        usersReviews={this.props.usersReviews}
        kitchen={this.props.kitchens.find(kitchen => kitchen.id === reservation.kitchen_id)}
        sentMessages={this.props.sentMessages.filter(m => m.reservation_id===reservation.id)}
        receivedMessages={this.props.receivedMessages.filter(m => m.reservation_id===reservation.id)}
        messagesButtonClicked={this.props.messagesButtonClicked}
      />
    ))
  }

  render() {
    return (
      <div>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              {(this.props.reservations.prior) ? (
                <div>
                  <Header as='h2'>Prior Reservations</Header>
                  <div>{this.reservationCards(this.props.reservations.prior, true)}</div>
                </div>
              ) : (
                <div>
                  You have no prior reservations.
                </div>
              ) }
            </Grid.Column>
            <Grid.Column>
              {(this.props.reservations.future) ? (
                <div>
                  <Header as='h2'>Upcoming Reservations</Header>
                  <div>{this.reservationCards(this.props.reservations.future)}</div>
                </div>
              ) : (
                <div>
                  You have no upcoming reservations.
                </div>
              ) }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}



export default ReservationList
