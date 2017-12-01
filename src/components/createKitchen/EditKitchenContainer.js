import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchKitchen } from '../../actions/kitchens.js'
import EditKitchenForm from './EditKitchenForm.js'

class EditKitchenContainer extends Component {

  componentDidMount = () => {
    this.props.fetchKitchen(this.props.match.params.id)
  }

  validUser = () => {
    if (this.props.selectedKitchen.owner && this.props.selectedKitchen.owner.id===this.props.currentUser.id) {
      return true
    } else return false
  }

  render() {
    return (
      <div>
        {(!this.props.currentUser.id) ? <p>You must be signed in to edit your kitchen</p> : (
          (!this.validUser()) ? <p>There seems to be trouble fetching your kitchen. Try again later.</p> : (
            <div>
              <EditKitchenForm savedKitchenData={this.props.selectedKitchen}/>
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
    selectedKitchen: state.kitchens.selectedKitchen,
    isLoading: state.kitchens.isLoading
  }
}
const mapDispatchToProps = (dispatch) => {
  return ({
    fetchKitchen: (kitchenID) => dispatch(fetchKitchen(kitchenID))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(EditKitchenContainer)
