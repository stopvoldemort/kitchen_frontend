import React, { Component } from 'react'
import { Input, Menu, Button, Form, Message, Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/users'
import { logout } from '../../actions/users'
import '../../style/navbar.css'


class NavbarContainer extends Component {

  state = {
    email: "phil@guest.com",
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
                <Menu.Item>
                  <Link to="/reservations"><Button>My Reservations</Button></Link>
                  <Link to="/"><Button onClick={this.handleLogout}>Logout</Button></Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/kitchens/new"><Button>Add Your Kitchen</Button></Link>
                </Menu.Item>
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
    resetLoginFail: state.user.resetLoginFail
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
