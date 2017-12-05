import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class MessageForm extends Component {

  state = {
    content: ""
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    const text = this.state.content
    if (text) {
      this.props.createMessage(text)
      this.setState({content: ""})
    }
  }

  handleChange = (ev) => {this.setState({content: ev.target.value})}


  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.TextArea
          onChange={this.handleChange}
          value={this.state.content}
          placeholder='Send a message...'
        />
        <Form.Button>Send</Form.Button>
      </Form>
    )
  }
}

export default MessageForm
