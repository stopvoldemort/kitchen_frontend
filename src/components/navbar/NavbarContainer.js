import React, { Component } from 'react'
import { Input, Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class NavbarContainer extends Component {

  // Navbar needs to be connected to the store to know if someone is logged in

  state = {
    email: "",
    password: ""
  }

  render() {
    return (
      <div>
        <Menu>

          <Menu.Item>
            <Link to="/">
              <h3>CounterSpace</h3>
            </Link>
          </Menu.Item>

          <Menu.Item position='right'>
            <Input placeholder='Email' value={this.state.email} />
            <Input placeholder='Password' value={this.state.password} />
            <Button >Login</Button>
          </Menu.Item>

          <Menu.Item>
            <Button>Sign Up</Button>
          </Menu.Item>

        </Menu>
      </div>
    )
  }
}

export default NavbarContainer
