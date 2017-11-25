import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Button } from 'semantic-ui-react'
import '../../style/show.css'

import 'react-datepicker/dist/react-datepicker.css';

class KitchenAvailability extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      guests: 0
    };
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
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

  handleChange = (ev) => {
    const guests = ev.target.value
    this.setState({guests: guests}, () => console.log(this.state))
  }

  estimatedPrice = () => {
    return `$${this.props.kitchen.base_price + (this.state.guests * this.props.kitchen.price_per_guest)}`
  }

  render() {
    return (
      <div>
        <h2>Availability</h2>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          inline={true}
          excludeDates={this.reservedDates()}
        />
        <br /><br />
        <div className="ui input guest-counter">
          <input type="text" onChange={this.handleChange} type="number" placeholder="Number of guests" />
        </div>
        <br /><br />
        <div className="price-wrapper">
          <h4>
            Estimated price: {this.estimatedPrice()}
          </h4>
        </div>
        <br /><br />
        <div className="button-wrapper">
          <button className="ui primary massive button">Book Now</button>
        </div>
      </div>
    )
  }
}

export default KitchenAvailability
