import React, { Component } from 'react'
import { Button, Modal, Image, TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { createKitchenReview } from '../../actions/kitchenReviews.js'
import ReactStars from 'react-stars'

const picUrl = "http://hgtvhome.sndimg.com/content/dam/images/hgtv/editorial/blogs/unsized/Kayla/RX-Frigidaire_kitchen-design-ideas_3.jpg"


class ReviewForm extends Component {

  state = {
    stars: 0,
    review: "",
    modalOpen: false
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  handleSubmit = () => {
    const reviewObj = {
      kitchen_review: {
        stars: parseInt(this.state.stars, 10),
        review: this.state.review,
        kitchen_id: this.props.reservation.kitchen.id,
        guest_id: this.props.currentUser.id
      }
    }
    this.props.createKitchenReview(reviewObj)
    this.handleClose()
  }

  handleTextChange = (ev, { value }) => {this.setState({review: value})}
  handleStarChange = (new_rating) => {this.setState({stars: new_rating})}

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>Write a review</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>{this.props.reservation.kitchen.title}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src={picUrl} />
          <Modal.Description>
            <div>
              <TextArea required placeholder="Write a review" onChange={this.handleTextChange} />
            </div>
            <div>
              <ReactStars half={false} onChange={this.handleStarChange} value={this.state.stars} />
            </div>
            <Modal.Actions>
              <Button primary onClick={this.handleSubmit}>
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
