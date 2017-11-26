import React, { Component } from 'react'
import { Input, Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/users'
import { logout } from '../../actions/users'


class NavbarContainer extends Component {

  // Navbar needs to be connected to the store to know if someone is logged in

  state = {
    email: "",
    password: ""
  }

  handleEmailChange = (ev) => {this.setState({email: ev.target.value})}
  handlePasswordChange = (ev) => {this.setState({password: ev.target.value})}

  handleLogin = (ev) => {
    ev.preventDefault()
    this.props.login(this.state.email, this.state.password)
    this.setState({email: "", password: ""})
  }

  handleLogout = () => {this.props.logout()}

  render() {
    return (
      <div>
        <Menu>

          <Menu.Item>
            <Link to="/">
              <h3>CounterSpace</h3>
            </Link>
          </Menu.Item>

          {(!this.props.loggedIn) ? (
            <div>
              <Menu.Item position='right'>
                <form onSubmit={this.handleLogin}>
                  <Input type="text" onChange={this.handleEmailChange} placeholder='Email' value={this.state.email} />
                  <Input type="password" onChange={this.handlePasswordChange} placeholder='Password' value={this.state.password} />
                  <Button type="submit">Login</Button>
                </form>
              </Menu.Item>

              <Menu.Item>
                <Button>Sign Up</Button>
              </Menu.Item>
            </div>
          ) : (

            <div>

              <Menu.Item position='right'>
                <Button onClick={this.handleLogout}>Logout</Button>
              </Menu.Item>

            </div>
          )}


        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password)),
    logout: () => dispatch(logout())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)
