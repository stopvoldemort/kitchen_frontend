import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchKitchen } from '../../actions/kitchens.js'
import EditKitchenForm from './EditKitchenForm.js'
import { Container, Header } from 'semantic-ui-react'

class EditKitchenContainer extends Component {

  componentDidMount = () => {
    this.props.resetKitchenUpdater()
    this.props.fetchKitchen(this.props.match.params.id)
  }

  validUser = () => {
    if (this.props.owner && this.props.owner.id===this.props.currentUser.id) {
      return true
    } else return false
  }

  render() {
    return (
      <div>
        {(!this.props.currentUser.id) ? <p>You must be signed in to edit your kitchen</p> : (
          (!this.validUser()) ? (
            <div>
              <p>You do not have permission to edit this kitchen.</p>
            </div>
          ) : (
            <div>
              <br/><br/>
              <Container>
                <Header as="h1" textAlign='center'>Edit Your Kitchen</Header>
                <br/><br/>
                <EditKitchenForm />
              </Container>
            </div>
          )
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    owner: state.kitchens.selectedKitchenOwner,
    isLoading: state.kitchens.isLoading
  }
}
const mapDispatchToProps = (dispatch) => {
  return ({
    fetchKitchen: (kitchenID) => dispatch(fetchKitchen(kitchenID)),
    resetKitchenUpdater: (kitchenID) => dispatch({type: "KITCHEN_WILL_UPDATE"})
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(EditKitchenContainer)
