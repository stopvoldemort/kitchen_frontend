import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import cuid from 'cuid'
import moment from 'moment'
import { ReservationCard } from './ReservationCard.js'
import { fetchReservations } from '../../actions/reservations.js'

class ReservationList extends Component {

  state = {
    reservations: {}
  }

  componentDidMount = () => {
    const userID = this.props.currentUser.id
    this.props.fetchReservations(userID)
  }


  reservationCards = (reservationsArray, isPrior) => {
    return reservationsArray.map(reservation => (
      <ReservationCard key={cuid()} reservation={reservation} prior={isPrior} />
    ))
  }


  render() {
    return (
      <div>
        {(this.props.reservations.today) ? (
          <div>
            <Header as='h2'>You Have A Reservation Tonight</Header>
            <div>{this.reservationCards([this.props.reservations.today])}</div>
            <br/><br/><br/>
          </div>
        ) : null }
        {(this.props.reservations.prior) ? (
          <div>
            <Header as='h2'>Prior Reservations</Header>
            <div>{this.reservationCards(this.props.reservations.prior, true)}</div>
            <br/><br/><br/>
          </div>
        ) : null }

        {(this.props.reservations.future) ? (
          <div>
            <Header as='h2'>Upcoming Reservations</Header>
            <div>{this.reservationCards(this.props.reservations.future)}</div>
            <br/><br/><br/>
          </div>
        ) : null }

      </div>
    )
  }
}

const turnStringDatesToNumbers = (dateString) => {
  const dateArr = dateString.split("-")
  const parsedDateArr = dateArr.map(n => parseInt(n, 10))
  return ((parsedDateArr[0]*10000) + (parsedDateArr[1]*100) + (parsedDateArr[2]*1))
}

const compare = (a,b) => {
  return turnStringDatesToNumbers(b.date) - turnStringDatesToNumbers(a.date)
}

const categorize = (reservations) => {
  const todayJS = new Date()
  const todayString = moment(todayJS).format('YYYY-MM-DD')
  const todaysNumber = turnStringDatesToNumbers(todayString)
  if (reservations.length) {
    const sortedReservations = reservations.sort(compare)
    const categorizedReservations = sortedReservations.reduce((agg, res) => {
      if (turnStringDatesToNumbers(res.date) < todaysNumber) {
        agg.prior.push(res)
      } else if (turnStringDatesToNumbers(res.date) > todaysNumber) {
        agg.future.push(res)
      } else if ((turnStringDatesToNumbers(res.date) === todaysNumber)) {
        agg.today = res
      }
      return agg
    }, {prior: [], future: [], today: {}})
    return categorizedReservations

  } else return []
}



const mapStateToProps = (state) => {
  const reservations = state.reservations.list
  const reservationsObj = categorize(reservations)
  return {
    currentUser: state.user.currentUser,
    reservations: reservationsObj
  }
}


const mapDispatchToProps = (dispatch) => {
  return ({
    fetchReservations: (userID) => dispatch(fetchReservations(userID))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationList)
