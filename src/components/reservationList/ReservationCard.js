import React, { Component } from 'react'
import { Card, Image, Button, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ReviewForm from '../reviews/ReviewForm.js'


export default class ReservationCard extends Component {

  // Note: 'prior' is an optional argument that is either true or undefined
  state = {noReviewContent: false}

  resetReviewFail = () => {this.setState({noReviewContent: !this.state.noReviewContent})}

  humanize = (date) => {
    let dateArr = date.split("-")
    const months = ["I am a month that will never be", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[parseInt(dateArr[1],10)] + " " + dateArr[2] + ", " + dateArr[0]
  }

  render() {
    const picUrl = this.props.reservation.kitchen_pictures[0].url
    const currentKitchenId = this.props.reservation.kitchen.id
    const previouslyReviewedKitchenIds = this.props.currentUser.reviewed_kitchens.map(k => k.kitchen_id)
    const previouslyReviewed = (previouslyReviewedKitchenIds.includes(currentKitchenId))
    const kitchenUrl = `/kitchens/${currentKitchenId}`

    return (
      <div>
        <Card centered>
          <Link to={kitchenUrl}>
            <Image src={picUrl} />
          </Link>
          <Card.Content>
            <Card.Header>
              {this.humanize(this.props.reservation.date)}
            </Card.Header>
            <Card.Meta>
              <Link to={kitchenUrl}>
                <span className='date'>{this.props.reservation.kitchen.title}</span>
              </Link>
            </Card.Meta>
            <Card.Description>
              {this.props.reservation.kitchen.blurb}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>{this.props.reservation.guest_number} guests</a>
          </Card.Content>
          {this.props.prior && !previouslyReviewed ?
            <ReviewForm reservation={this.props.reservation} showErrorMessage={this.resetReviewFail} />
          : null}
          {this.props.prior && previouslyReviewed ?
            <Button disabled>You previously reviewed this kitchen</Button>
          : null}

        </Card>
        {(this.state.noReviewContent) ?
          <Message negative onDismiss={this.resetReviewFail}>
            <Message.Header>Your review needs a description of your experience and a star rating.</Message.Header>
          </Message>
          : null
        }
        <br/><br/><br/>
      </div>
    )
  }
}
