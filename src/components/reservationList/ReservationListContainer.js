import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReservationList from './ReservationList.js'
import { MessageList } from '../messages/MessageList.js'
import { Container, Header, Sidebar, Segment, Menu } from 'semantic-ui-react'
import moment from 'moment'
import { cancelReservation } from '../../actions/reservations.js'
import { createMessage, readMessages } from '../../actions/messages.js'



class ReservationListContainer extends Component {
  state = {
    visible: false,
    selectedReservation: {},
    selectedReservationIsPrior: false
   }

   createMessage = (text) => {
     const kitchen = this.props.kitchens.find(k => (
       this.state.selectedReservation.kitchen_id === k.id
     ))
     const messageObj = {
       message: {
         sender_id: this.props.currentUser.id,
         reservation_id: this.state.selectedReservation.id,
         content: text,
         recipient_id: kitchen.owner_id,
         read: false
       }
     }
     this.props.createMessage(messageObj)
   }

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

  filterMessagesByReservation = (messages) => (
    messages.filter(m => (
      m.reservation_id === this.state.selectedReservation.id
    ))
  )

  messagesButtonClicked = (reservationID) => {
    const priorRes = this.props.reservations.prior.find(r => r.id===reservationID)
    const futureRes = this.props.reservations.future.find(r => r.id===reservationID)

    const clickedReservation = priorRes || futureRes
    const prior = !!priorRes

    if (!this.state.visible) {
      this.setState({
        selectedReservation: clickedReservation,
        selectedReservationIsPrior: prior,
        visible: true
      })
    }
    window.scrollTo(0, 0)
  }

  handleContainerClick = () => {
    if (this.state.visible) {
      this.setState({
        selectedReservation: {},
        visible: false
      })
    }
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


  sideToSlideFrom = () => (this.state.selectedReservationIsPrior ? "left" : "right")

  render() {
    return (
      <div>
        <br/><br/>
        <Container textAlign='center'>
          <Header as="h1">My Reservations</Header>
          <br/><br/>
          {(!this.props.currentUser.id) ? <p>You must be signed in to see your reservations</p> :
            <div>
              <Sidebar.Pushable as={Segment}>
                <Sidebar as={Menu} animation='push' width='very wide'
                direction={this.sideToSlideFrom()} visible={this.state.visible}
                icon='labeled' vertical inverted>
                  <Menu.Item>
                    <Header
                      as="h3"
                      inverted
                      content={`Messages with your host`}
                    />
                    <MessageList
                      currentUser={this.props.currentUser}
                      messages={this.viewReservationMessages()}
                      createMessage={this.createMessage}
                    />
                  </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher>
                  <Segment basic onClick={this.handleContainerClick}>
                    <ReservationList
                      selectedReservation={this.state.selectedReservation}
                      reservations={this.props.reservations}
                      currentUser={this.props.currentUser}
                      receivedMessages={this.props.receivedMessages}
                      sentMessages={this.props.sentMessages}
                      kitchens={this.props.kitchens}
                      kitchenPictures={this.props.kitchenPictures}
                      usersReviews={this.props.usersReviews}
                      cancelReservation={this.props.cancelReservation}
                      messagesButtonClicked={this.messagesButtonClicked}
                    />
                  </Segment>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </div>
          }
        </Container>
      </div>
    )
  }
}


const turnStringDatesToNumbers = (dateString) => {
  const dateArr = dateString.split("-")
  const parsedDateArr = dateArr.map(n => parseInt(n, 10))
  return ((parsedDateArr[0]*10000) + (parsedDateArr[1]*100) + (parsedDateArr[2]*1))
}

const compareDescending = (a,b) => (
  turnStringDatesToNumbers(b.date) - turnStringDatesToNumbers(a.date)
)

const compareAscending = (a,b) => (
  turnStringDatesToNumbers(a.date) - turnStringDatesToNumbers(b.date)
)

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
  const reservations = state.user.usersReservations
  const reservationsObj = categorize(reservations)
  return {
    currentUser: state.user.currentUser,
    receivedMessages: state.user.usersReceivedMessages,
    sentMessages: state.user.usersSentMessages,
    kitchenPictures: state.user.usersReservationsKitchensPictures,
    kitchens: state.user.usersReservationsKitchens,
    usersReviews: state.user.usersReviews,
    reservations: reservationsObj
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    cancelReservation: (reservationID) => dispatch(cancelReservation(reservationID)),
    createMessage: (reservationID) => dispatch(createMessage(reservationID)),
    readMessages: (messageIDs) => dispatch(readMessages(messageIDs))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationListContainer)
