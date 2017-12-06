import React, { Component } from 'react'
import { MyKitchensReservationCard } from './MyKitchensReservationCard.js'
import cuid from 'cuid'
import { Sidebar, Segment, Menu, Header } from 'semantic-ui-react'
import { MessageList } from '../messages/MessageList.js'


class MyKitchensReservationList extends Component {

  state = {
    visible: false,
    selectedReservation: {}
  }


  handleContainerClick = () => {
    if (this.state.visible) this.setState({
      visible: false,
      selectedReservation: {}
    })
  }

  messagesButtonClicked = (reservationID) => {
    const clickedReservation = this.props.reservations.find(r => r.id===reservationID)

    if (!this.state.visible) {
      this.setState({
        selectedReservation: clickedReservation,
        visible: true
      })
    }
    window.scrollTo(0, 0)
  }

  reservationCards = () => {
    const sortedReservations = this.props.reservations.sort(this.compareDescending)
    return sortedReservations.map(res => (
      <MyKitchensReservationCard
        reservation={res}
        key={cuid()}
        messages={this.props.receivedMessages.filter(m => m.reservation_id===res.id)}
        guest={this.props.guests.find(g => res.guest_id===g.id)}
        currentUser={this.props.currentUser}
        messagesButtonClicked={this.messagesButtonClicked}
      />
    ))
  }

  turnStringDatesToNumbers = (dateString) => {
    const dateArr = dateString.split("-")
    const parsedDateArr = dateArr.map(n => parseInt(n, 10))
    return ((parsedDateArr[0]*10000) + (parsedDateArr[1]*100) + (parsedDateArr[2]*1))
  }

  compareDescending = (a,b) => (
    this.turnStringDatesToNumbers(b.date) - this.turnStringDatesToNumbers(a.date)
  )

  filterMessagesByReservation = (messages) => (
    messages.filter(m => (
      m.reservation_id === this.state.selectedReservation.id
    ))
  )

  viewReservationMessages = () => {
    const received = this.filterMessagesByReservation(this.props.receivedMessages)
    this.readMessages(received)
    const sent = this.filterMessagesByReservation(this.props.sentMessages)
    const messages = [...received, ...sent]
    const sortedMessages = messages.sort(this.compareMilliseconds)
    return sortedMessages
  }

  compareMilliseconds = (a,b) => {
    if (a.milliseconds < b.milliseconds) return -1
    if (a.milliseconds > b.milliseconds) return 1
    return 0
  }

  readMessages = (messages) => {
    const toRead = messages.filter(m => (!m.read))
    if (toRead.length) {
      const nowRead = toRead.map(m => {
        m.read=true
        return m.id
      })
      this.props.readMessages(nowRead)
    }
  }

  createMessage = (text) => {
    const messageObj = {
      message: {
        sender_id: this.props.currentUser.id,
        reservation_id: this.state.selectedReservation.id,
        content: text,
        recipient_id: this.state.selectedReservation.guest_id,
        read: false
      }
    }
    this.props.createMessage(messageObj)
  }

  render() {
    const { visible } = this.state
    return (
      <div>
        <Sidebar.Pushable as={Segment} >
          <Sidebar as={Menu} animation='push' width='very wide' direction='right'
            visible={visible} icon='labeled' vertical inverted >
            <Menu.Item>
              <Header
                as="h3"
                inverted
                content={`Messages with your guest for the ${this.state.selectedReservation.date} reservation`}
              />
              <MessageList
                currentUser={this.props.currentUser}
                messages={this.viewReservationMessages()}
                createMessage={this.createMessage}
              />
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher onClick={this.handleContainerClick}>
              {this.reservationCards()}
          </Sidebar.Pusher>
        </Sidebar.Pushable>

      </div>
    )
  }

}

export default MyKitchensReservationList
