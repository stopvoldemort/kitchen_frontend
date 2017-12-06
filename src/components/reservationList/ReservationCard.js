import React, { Component } from 'react'
import { Card, Image, Button, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ReviewForm from '../reviews/ReviewForm.js'


export default class ReservationCard extends Component {

  // Note: 'prior' is an optional prop passed dwon from ReservationList
  // that is either true or undefined
  state = {
    noReviewContent: false,
    messageButtonClicked: false
  }

  resetReviewFail = () => {this.setState({noReviewContent: !this.state.noReviewContent})}

  humanize = (date) => {
    let dateArr = date.split("-")
    const months = ["I am a month that will never be", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[parseInt(dateArr[1],10)] + " " + dateArr[2] + ", " + dateArr[0]
  }

  handleCancelClick = () => {
    this.props.cancelReservation(this.props.reservation.id)
  }

  unreadMessages = () => (this.props.receivedMessages.filter(m => !m.read))

  unreadMessagesNote = () => {
    const unread = this.unreadMessages()
    if (unread.length===1) return `You have 1 new messages`
    if (unread.length===0) return `You have no new messages`
    else return `You have ${unread.length} new messages`
  }

  handleMessageClick = () => {
    this.props.messagesButtonClicked(this.props.reservation.id)
  }

  render() {
    const picUrl = this.props.kitchenPicture.url
    const currentKitchenId = this.props.kitchen.id
    const previouslyReviewedKitchenIds = this.props.usersReviews.map(k => k.kitchen_id)
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
                <span className='date'>{this.props.kitchen.title}</span>
              </Link>
            </Card.Meta>
            <Card.Description>
              {this.props.kitchen.blurb}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {this.props.reservation.guest_number} guests
          </Card.Content>
          <Card.Content>
            <Button primary basic size="large" onClick={this.handleMessageClick} active={this.state.messageButtonClicked}>
              {this.unreadMessagesNote()}
            </Button>
          </Card.Content>
          {this.props.prior && !previouslyReviewed ?
            <ReviewForm
              kitchen={this.props.kitchen}
              reservation={this.props.reservation}
              showErrorMessage={this.resetReviewFail}
              kitchenPicture={this.props.kitchenPicture}
            />
          : null}
          {this.props.prior && previouslyReviewed ?
            <Button disabled>You previously reviewed this kitchen</Button>
          : null}

          {!this.props.prior ?
            <Card.Content>
              <Button negative basic size="tiny" onClick={this.handleCancelClick}>Cancel Reservation</Button>
            </Card.Content>
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
