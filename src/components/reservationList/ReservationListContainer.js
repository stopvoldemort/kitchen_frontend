import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReservationList from './ReservationList.js'
import { Container, Header } from 'semantic-ui-react'

class ReservationListContainer extends Component {

  render() {
    return (
      <div>
        <br/><br/>
        <Container textAlign='center'>
          <Header as="h1">My Reservations</Header>
          <br/><br/>
          {(this.props.currentUser.id) ? <ReservationList /> : <p>You must be signed in to see your reservations</p>}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(ReservationListContainer)
