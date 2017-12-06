import React, { Component } from 'react'
import { Input, Menu, Button, Form, Message, Container, Header, Dropdown, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/users'
import { logout } from '../../actions/users'
import '../../style/navbar.css'



class NavbarContainer extends Component {

  state = {
    email: "david@guest.com",
    password: "12345",
    searchInput: ""
  }

  searchSubmitted = () => {
    if (this.state.searchInput) {
      const path = `/kitchens/?query=${this.state.searchInput}`
      this.setState({searchInput: ""})
      this.props.history.push(path)
    } else {
      return null
    }
  }

  handleEmailChange = (ev) => {this.setState({email: ev.target.value})}
  handlePasswordChange = (ev) => {this.setState({password: ev.target.value})}
  handleSearchChange = (ev) => {this.setState({searchInput: ev.target.value})}

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

  hasUnreadMessages = () => {
    return this.props.receivedMessages.some((m) => !m.read)
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

          {(this.props.location.pathname==="/") ? null : (
            <Menu.Item>
              <Form onSubmit={this.searchSubmitted}>
                <Input
                  type="text"
                  placeholder='Search...'
                  value={this.state.searchInput}
                  onChange={this.handleSearchChange}
                />
              </Form>
            </Menu.Item>
          )}

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
                    <Link to="/reservations">
                      <Dropdown.Item icon='calendar' text='My Reservations' />
                    </Link>
                    <Link to="/mykitchens">
                      <Dropdown.Item icon='globe' text='My Kitchens' />
                    </Link>
                    <Link to="/kitchens/new">
                      <Dropdown.Item icon='food' text='Add My Kitchen' />
                    </Link>
                    <Link to="/">
                      <Dropdown.Item onClick={this.handleLogout} text='Logout' />
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
              <Menu.Item>
                {!this.hasUnreadMessages() ? null : (
                  <Icon link size="big" name='inbox'/>
                )}
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
    receivedMessages: state.user.usersReceivedMessages
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
