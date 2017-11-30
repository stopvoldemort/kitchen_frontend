import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Grid } from 'semantic-ui-react'
import cuid from 'cuid'
import moment from 'moment'
import ReservationCard from './ReservationCard.js'
import { fetchReservations } from '../../actions/reservations.js'

class ReservationList extends Component {

  componentDidMount = () => {
    const userID = this.props.currentUser.id
    this.props.fetchReservations(userID)
  }

  reservationCards = (reservationsArray, isPrior) => {
    return reservationsArray.map(reservation => (
      <ReservationCard
        key={cuid()}
        reservation={reservation}
        currentUser={this.props.currentUser}
        prior={isPrior}
      />
    ))
  }

  render() {
    return (
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
    )
  }
}

const turnStringDatesToNumbers = (dateString) => {
  const dateArr = dateString.split("-")
  const parsedDateArr = dateArr.map(n => parseInt(n, 10))
  return ((parsedDateArr[0]*10000) + (parsedDateArr[1]*100) + (parsedDateArr[2]*1))
}

const compareDescending = (a,b) => {
  return turnStringDatesToNumbers(b.date) - turnStringDatesToNumbers(a.date)
}

const compareAscending = (a,b) => {
  return turnStringDatesToNumbers(a.date) - turnStringDatesToNumbers(b.date)
}

const categorize = (reservations) => {
  const todayJS = new Date()
  const todayString = moment(todayJS).format('YYYY-MM-DD')
  const todaysNumber = turnStringDatesToNumbers(todayString)
  if (reservations.length) {
    const categorizedReservations = reservations.reduce((agg, res) => {
      if (turnStringDatesToNumbers(res.date) < todaysNumber) {
        agg.prior.push(res)
      } else if (turnStringDatesToNumbers(res.date) >= todaysNumber) {
        agg.future.push(res)
      }
      return agg
    }, {prior: [], future: []})
    categorizedReservations.prior = categorizedReservations.prior.sort(compareDescending)
    categorizedReservations.future = categorizedReservations.future.sort(compareAscending)
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
