import React, { Component } from 'react'
import CreateKitchenForm from './CreateKitchenForm.js'
import { connect } from 'react-redux'
import { Container, Header } from 'semantic-ui-react'

class CreateKitchenContainer extends Component {

  render() {
    return (
      <div>
        <br/><br/>
        <Container>
          <Header as="h1" textAlign='center'>Add Your Kitchen On CounterSpace</Header>
          <br/><br/>
          {(this.props.currentUser.id) ? <CreateKitchenForm /> : <p>You must be signed in to add your kitchen.</p>}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedKitchen: state.kitchens.selectedKitchen,
    currentUser: state.user.currentUser
  }
}




export default connect(mapStateToProps)(CreateKitchenContainer)
