import React, { Component } from 'react'
import { Button, Modal, Image, Input, TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { createKitchenReview } from '../../actions/kitchenReviews.js'

const picUrl = "http://hgtvhome.sndimg.com/content/dam/images/hgtv/editorial/blogs/unsized/Kayla/RX-Frigidaire_kitchen-design-ideas_3.jpg"


class ReviewForm extends Component {

  state = {
    stars: 0,
    review: ""
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    const reviewObj = {
      kitchen_review: {
        stars: parseInt(this.state.stars, 10),
        review: this.state.review,
        kitchen_id: this.props.reservation.kitchen.id,
        guest_id: this.props.currentUser.id
      }
    }
    this.props.createKitchenReview(reviewObj)
  }

  // KITCHEN REVIEW MODAL DOES NOT CLOSE AFTER REVIEW IS SUBMITTED

  handleTextChange = (ev, { value }) => {this.setState({review: value})}
  handleStarChange = (ev, { value }) => {this.setState({star: value})}

  render() {
    return (
      <Modal trigger={<Button>Write a review</Button>}>
        <Modal.Header>{this.props.reservation.kitchen.title}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src={picUrl} />
          <Modal.Description>
            <TextArea autoHeight placeholder="Write a review" onChange={this.handleTextChange} />
            <Input type="number" placeholder="Stars" onChange={this.handleStarChange}/>
            <Modal.Actions>
              <Button primary onClick={this.handleClick}>
                Submit
              </Button>
            </Modal.Actions>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    newReservationCreated: state.reservations.newReservationCreated
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    createKitchenReview: (reviewObj) => dispatch(createKitchenReview(reviewObj))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
