import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux'
import '../../style/show.css'
import { createReservation } from '../../actions/reservations.js'


import 'react-datepicker/dist/react-datepicker.css';

class KitchenAvailability extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedDate: moment(),
      guests: 0
    };
  }

  handleChange = (date) => {
    this.setState({
      selectedDate: date
    });
  }

  reservedDates = () => {
    return this.props.kitchen.reservations.map((reservation) => {
      let dateArr = reservation.date.split("-")
      // Turns "2017-11-25" into "(2017, 10, 25)"
      const dateObj = new Date(dateArr[0], (dateArr[1]-1), dateArr[2])
      return moment(dateObj)
    })
  }

  handleGuestChange = (ev) => {
    const guests = ev.target.value
    this.setState({guests: guests})
  }

  estimatedPrice = () => {
    return `$${this.props.kitchen.base_price + (this.state.guests * this.props.kitchen.price_per_guest)}`
  }

  handleBook = () => {
    if (!this.props.currentUser.id) {
      console.log("you are not signed in")
    } else if (!this.state.guests) {
      console.log("how many guests?")
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
      // On successful reservation creation, need to redirect to My Reservations page
    }
  }

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
          <input onChange={this.handleGuestChange} type="number" placeholder="Number of guests" />
        </div>
        <br /><br />
        <div className="price-wrapper">
          <h4>
            Estimated price: {this.estimatedPrice()}
          </h4>
        </div>
        <br /><br />
        <div className="button-wrapper">
          <button onClick={this.handleBook} className="ui primary massive button">Book Now</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({currentUser: state.user.currentUser})
const mapDispatchToProps = (dispatch) => {
  return ({
    createReservation: (bookObj) => dispatch(createReservation(bookObj))
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(KitchenAvailability)
