import React, { Component } from 'react'
import { Form, Icon, Message } from 'semantic-ui-react'
import '../../style/user.css'
import { connect } from 'react-redux'
import { createUser } from '../../actions/users.js'
import AddUserPic from './AddUserPic.js'

class CreateUserContainer extends Component {

  state = {
    name: "",
    email: "",
    password: "",
    bio: "",
    pic_url: "",
    invalidEmail: false
  }

  handleNameChange = (e, { value }) => this.setState({ name: value })
  handleEmailChange = (e, { value }) => this.setState({ email: value })
  handlePasswordChange = (e, { value }) => this.setState({ password: value })
  handleBioChange = (e, { value }) => this.setState({ bio: value })

  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.validateEmail()) this.setState({invalidEmail: true})
    else {
      const state = this.state
      const userObj = {user: {
        name: state.name, email: state.email, password: state.password, bio: state.bio, pic_url: state.pic_url
      }}
      this.props.createUser(userObj)
    }
  }

  handleEmailBlur = () => {
    if (!this.validateEmail()) this.setState({invalidEmail: true})
    else this.setState({invalidEmail: false})
  }

  validateEmail = () => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.state.email)
  }

  componentDidUpdate = () => {
    if (localStorage.getItem('jwt')) this.props.history.push('/')
  }

  addImage = (imgUrl) => {this.setState({pic_url: imgUrl})}

  resetSignupFail = () => {this.props.resetSignupFail()}
  resetInvalidEmail = () => {this.setState({invalidEmail: false})}

  render() {
    return (
      <div className="create-user-container">
        <Form onSubmit={this.handleSubmit}>
          <h1>Sign Up</h1>
          <Form.Input required label='Name' placeholder='Name' onChange={this.handleNameChange} />
          <Form.Group widths='equal'>
            <Form.Input required iconPosition='left' label='Email' placeholder='Email address' onChange={this.handleEmailChange} onBlur={this.handleEmailBlur} >
              <Icon name='at' />
              <input />
            </Form.Input>
            <Form.Input required type="password" label='Password' placeholder='Password' onChange={this.handlePasswordChange} />
          </Form.Group>
          <Form.TextArea label='Bio' placeholder='Tell us more about you...' onChange={this.handleBioChange} />

          <AddUserPic addImage={this.addImage} />

          <Form.Button primary>Sign Up</Form.Button>
        </Form>
        {(this.props.signupFail) ? (
          <Message negative onDismiss={this.resetSignupFail}>
            <Message.Header>Something went wrong with your submission. Please try again.</Message.Header>
          </Message>
        ) : null }
        {(this.state.invalidEmail) ? (
          <Message negative onDismiss={this.resetInvalidEmail}>
            <Message.Header>Please enter a valid email address.</Message.Header>
          </Message>
        ) : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    signupFail: state.user.signupFail
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    createUser: (bookObj) => dispatch(createUser(bookObj)),
    resetSignupFail: () => dispatch({type: "RESET_SIGNUP_FAIL"})
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateUserContainer)
