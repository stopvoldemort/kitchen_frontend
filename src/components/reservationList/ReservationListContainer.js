import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReservationList from './ReservationList.js'
import { MessageList } from '../messages/MessageList.js'
import { Container, Header, Button, Sidebar, Segment, Menu } from 'semantic-ui-react'

class ReservationListContainer extends Component {
  state = {
    visible: false,
    messages: [],
    selectedReservation: {}
   }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  // Will need to link the "read" buttons on the reservation card to the toggle,
  // and these will also need to change the "messages" state of this container in
  // in order for it to know what to show.
  componentDidMount = () => {
    // this.setState({messages: this.props.receivedMessages}, () => console.log(this.state))
  }


  allReservationMessages = () => {
    const received = this.filterMessagesByReservation(this.props.receivedMessages)
    const sent = this.filterMessagesByReservation(this.props.sentMessages)
    // return these
  }


  filterMessagesByReservation = (messages) => (
    messages.filter(m => (
      m.reservation_id === this.state.selectedReservation.kitchen_id
    ))
  )

  setSelectedReservation = (reservation) => {
    this.setState({selectedReservation: reservation})
  }

  sideToSlideFrom = () => (this.state.selectedReservation.prior ? "left" : "right")


  render() {
    return (
      <div>
        <br/><br/>
        <Container textAlign='center'>
          <Header as="h1">My Reservations</Header>
          <br/><br/>
          {(!this.props.currentUser.id) ? <p>You must be signed in to see your reservations</p> :
            <div>
              <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
              <Sidebar.Pushable as={Segment}>
                <Sidebar as={Menu} animation='push' width='very wide'
                direction={this.sideToSlideFrom()} visible={this.state.visible}
                icon='labeled' vertical inverted>
                  <Menu.Item>
                    <MessageList messages={this.props.receivedMessages}/>
                  </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher>
                  <Segment basic>
                    <ReservationList setSelectedReservation={this.setSelectedReservation}/>
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    receivedMessages: state.user.usersReceivedMessages,
    sentMessages: state.user.usersSentMessages,
  }
}

export default connect(mapStateToProps)(ReservationListContainer)
