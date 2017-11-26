import React, { Component } from 'react'
import { connect } from 'react-redux'
import cuid from 'cuid'
import { ReservationCard } from './ReservationCard.js'
import { fetchReservations } from '../../actions/reservations.js'

class ReservationList extends Component {

  componentDidMount = () => {
    const userID = this.props.currentUser.id
    this.props.fetchReservations(userID)
  }

  reservationCards = () => {
    return this.props.reservations.map(reservation => (
      <ReservationCard key={cuid()} reservation={reservation} />
    ))
  }

  render() {
    return (
      <div>
        <div>{this.reservationCards()}</div>
      </div>
    )
  }
}


const turnStringDatesToNumbers = (dateString) => {
  const dateArr = dateString.split("-")
  const parsedDateArr = dateArr.map(n => parseInt(n, 10))
  return ((parsedDateArr[0]*1000) + (parsedDateArr[1]*100) + (parsedDateArr[2]*1))
}

const compare = (a,b) => {
  return turnStringDatesToNumbers(b.date) - turnStringDatesToNumbers(a.date)
}

const mapStateToProps = (state) => {
  const reservations = state.reservations.list
  const sortedReservations = (reservations.length) ? reservations.sort(compare) : []
  return {
    currentUser: state.user.currentUser,
    reservations: sortedReservations
  }
}


const mapDispatchToProps = (dispatch) => {
  return ({
    fetchReservations: (userID) => dispatch(fetchReservations(userID))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationList)
