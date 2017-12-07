import React, { Component } from 'react'
import { Input, Menu, Button, Form, Message, Container, Header, Dropdown, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/users'
import { logout } from '../../actions/users'
import '../../style/navbar.css'



class NavbarContainer extends Component {

  state = {
    email: "david@guest.com",
    password: "12345"
  }

  handleEmailChange = (ev) => {this.setState({email: ev.target.value})}
  handlePasswordChange = (ev) => {this.setState({password: ev.target.value})}

  handleLogin = (ev) => {
    ev.preventDefault()
    this.props.login(this.state.email, this.state.password)
    this.setState({email: "", password: ""})
  }

  handleLogout = () => {this.props.logout()}
  resetLoginFail = () => {this.props.resetLoginFail()}

  firstName = () => {
    const first = this.props.currentUser.name.split(" ")[0]
    return first.charAt(0).toUpperCase() + first.slice(1)
  }

  unreadMessages = () => (this.props.receivedMessages.filter((m) => !m.read))

  unreadNum = () => {
    const unread = this.unreadMessages()
    return unread.length
  }

  unreadMessagesAsGuest = () => {
    const unread = this.unreadMessages()
    const unreadGuestMessages = unread.filter(m => {
      const res = this.props.usersReservations.find(r => r.id === m.reservation_id)
      if (res && res.guest_id === m.recipient_id) return true
      else return false
    })
    return unreadGuestMessages.length
  }

  unreadMessagesAsOwner = () => {
    const unread = this.unreadMessages()
    const unreadGuestMessages = unread.filter(m => {
      const res = this.props.usersReservations.find(r => r.id === m.reservation_id)
      if (res && res.guest_id === m.recipient_id) return false
      else return true
    })
    return unreadGuestMessages.length
  }


  render() {
    return (
      <div>
        <Menu>

          <Menu.Item>
            <Link to="/">
              <Header color="blue" as='h1'>CounterSpace</Header>
            </Link>
          </Menu.Item>

          {(!this.props.loggedIn) ? (
            <Container>
              <Menu.Item position='right'>
                <Form onSubmit={this.handleLogin}>
                  <Input type="text" onChange={this.handleEmailChange} placeholder='Email' value={this.state.email} />
                  <Input type="password" onChange={this.handlePasswordChange} placeholder='Password' value={this.state.password} />
                  <Button type="submit">Login</Button>
                </Form>
              </Menu.Item>

              <Menu.Item>
                <Link to='/users/new'><Button primary>Sign Up</Button></Link>
              </Menu.Item>
            </Container>
          ) : (
            <Container>
              <Menu.Item position='right'>
                <Dropdown basic pointing="right" item text={`Welcome, ${this.firstName()}`}>
                  <Dropdown.Menu>
                    <Dropdown.Item disabled />
                    <Link to="/reservations">
                      <Dropdown.Item>
                        <Icon name="calendar"/>
                        My Reservations
                        <Label color='red'>{this.unreadMessagesAsGuest()}</Label>
                      </Dropdown.Item>
                    </Link>
                    <Link to="/mykitchens">
                      <Dropdown.Item>
                        <Icon name="globe"/>
                        My Kitchens
                        <Label color='red'>{this.unreadMessagesAsOwner()}</Label>
                      </Dropdown.Item>
                    </Link>
                    <Link to="/kitchens/new">
                      <Dropdown.Item icon='food' text='Add My Kitchen' />
                    </Link>
                    <Dropdown.Item disabled />
                    <Link to="/">
                      <Dropdown.Item onClick={this.handleLogout} text='Logout' />
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
                <Label color='red'>{this.unreadNum()}</Label>
              </Menu.Item>
            </Container>
          )}


        </Menu>
        {(this.props.loginFail) ? (
          <Message negative onDismiss={this.resetLoginFail}>
            <Message.Header>Your username and/or password are incorrect</Message.Header>
          </Message>
        ) : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    currentUser: state.user.currentUser,
    loginFail: state.user.loginFail,
    resetLoginFail: state.user.resetLoginFail,
    receivedMessages: state.user.usersReceivedMessages,
    usersReservations: state.user.usersReservations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password)),
    logout: () => dispatch(logout()),
    resetLoginFail: () => dispatch({type: "RESET_LOGIN_FAIL"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)
