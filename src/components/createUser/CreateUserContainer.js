import React, { Component } from 'react'
import { Form, Icon } from 'semantic-ui-react'
import '../../style/user.css'
import { connect } from 'react-redux'
import { createUser } from '../../actions/users.js'
import { Redirect } from 'react-router-dom'

class CreateUserContainer extends Component {

  state = {
    name: "",
    email: "",
    password: "",
    bio: "",
    redirectToHome: false
  }

  handleNameChange = (e, { value }) => this.setState({ name: value })
  handleEmailChange = (e, { value }) => this.setState({ email: value })
  handlePasswordChange = (e, { value }) => this.setState({ password: value })
  handleBioChange = (e, { value }) => this.setState({ bio: value })

  handleSubmit = (e) => {
    e.preventDefault()
    const x = this.state
    const userObj = {user:
      {name: x.name, email: x.email, password: x.password, bio: x.bio}
    }
    this.props.createUser(userObj)
  }

  componentDidUpdate = () => {
    if (this.props.currentUser.id) this.setState({redirectToHome: true})
  }

  render() {
    return (
      <div className="create-user-container">
        <Form onSubmit={this.handleSubmit}>
          <h1>Sign Up</h1>
          <Form.Input label='Name' placeholder='Name' onChange={this.handleNameChange} />
          <Form.Group widths='equal'>
            <Form.Input iconPosition='left' label='Email' placeholder='Email address' onChange={this.handlePasswordChange} >
              <Icon name='at' />
              <input />
            </Form.Input>
            <Form.Input type="password" label='Password' placeholder='Password' onChange={this.handleEmailChange} />
          </Form.Group>
          <Form.TextArea label='Bio' placeholder='Tell us more about you...' onChange={this.handleBioChange} />
          <Form.Button primary>Sign Up</Form.Button>
        </Form>
        {(this.state.redirectToHome) ? <Redirect push to="/"/> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    createUser: (bookObj) => dispatch(createUser(bookObj))
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateUserContainer)
