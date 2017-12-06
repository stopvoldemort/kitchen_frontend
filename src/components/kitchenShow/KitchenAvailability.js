import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import '../../style/show.css'
import { createReservation, resetNewReservationCreated } from '../../actions/reservations.js'
import { Message, Input } from 'semantic-ui-react'


import 'react-datepicker/dist/react-datepicker.css';

class KitchenAvailability extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedDate: moment(),
      guests: 0,
      notLoggedIn: false,
      noGuests: false,
      tooManyGuests: false
    };
  }

  handleChange = (date) => {
    this.setState({
      selectedDate: date
    });
  }

  reservedDates = () => {
    return this.props.reservations.map((reservation) => {
      let dateArr = reservation.date.split("-")
      // Turns "2017-11-25" into "(2017, 10, 25)"
      const dateObj = new Date(dateArr[0], (dateArr[1]-1), dateArr[2])
      return moment(dateObj)
    })
  }

  handleGuestChange = (ev) => {
    const guests = ev.target.value
    if (guests > this.props.kitchen.max_guests) {
      this.setState({tooManyGuests: true, guests: this.props.kitchen.max_guests})
    } else if (guests < 0) this.setState({guests: 0})
    else this.setState({guests: guests})
  }

  estimatedPrice = () => {
    const numGuests = this.state.guests
    const base = this.props.kitchen.base_price
    const extra = this.props.kitchen.price_per_guest
    return (numGuests <=2) ? base : base + (extra * (numGuests-2))
  }

  handleBook = () => {
    if (!this.props.currentUser.id) {
      this.setState({notLoggedIn: true})
    } else if (!this.state.guests) {
      this.setState({noGuests: true})
    } else {
      const date = this.state.selectedDate.toDate()
      const dateString = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
      const bookObj = {reservation: {
          guest_id: this.props.currentUser.id,
          kitchen_id: this.props.kitchen.id,
          guest_number: parseInt(this.state.guests, 10),
          date: dateString
        }
      }
      this.props.createReservation(bookObj)
    }
  }

  resetBookFail = () => {this.setState({notLoggedIn: false, noGuests: false})}
  resetTooManyGuests = () => {this.setState({tooManyGuests: false})}

  componentWillUnmount = () => {this.props.resetNewReservationCreated()}

  render() {

    return (
      <div>
        <h2>Availability</h2>
        <DatePicker
          selected={this.state.selectedDate}
          onChange={this.handleChange}
          inline={true}
          excludeDates={this.reservedDates()}
        />
        <br /><br />
        <div className="ui input guest-counter">
          <Input
            onChange={this.handleGuestChange}
            onBlur={this.handleGuestBlur}
            size="mini"
            label="Guests"
            value={this.state.guests}
            type="number"
          />
        </div>
        <br /><br />
        <div className="price-wrapper">
          <h4>
            Estimated price: ${this.estimatedPrice()}
          </h4>
        </div>
        <br /><br />
        <div className="button-wrapper">
          <button onClick={this.handleBook} className="ui primary massive button">Book Now</button>
          {(this.props.newReservationCreated) ? <Redirect push to="/reservations" /> : null}
        </div>
        {(this.state.notLoggedIn) ? (
          <Message negative onDismiss={this.resetBookFail}>
            <Message.Header>You need to be logged in to book a kitchen.</Message.Header>
          </Message>
        ) : null }
        {(this.state.noGuests) ? (
          <Message negative onDismiss={this.resetBookFail}>
            <Message.Header>How many guests will there be?</Message.Header>
          </Message>
        ) : null }
        {(this.state.tooManyGuests) ? (
          <Message negative onDismiss={this.resetTooManyGuests}>
            <Message.Header>This kitchen only fits {this.props.kitchen.max_guests} guests</Message.Header>
          </Message>
        ) : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    newReservationCreated: state.reservations.newReservationCreated
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    createReservation: (bookObj) => dispatch(createReservation(bookObj)),
    resetNewReservationCreated: () => dispatch(resetNewReservationCreated()),
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(KitchenAvailability)
