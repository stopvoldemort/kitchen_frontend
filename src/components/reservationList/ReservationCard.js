import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ReviewForm from '../reviews/ReviewForm.js'


export const ReservationCard = ({ reservation, prior, currentUser }) => {

  // Note: 'prior' is an optional argument that is either true or undefined

  const humanize = (date) => {
    let dateArr = date.split("-")
    const months = ["I am a month that will never be", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[parseInt(dateArr[1],10)] + " " + dateArr[2] + ", " + dateArr[0]
  }

  const picUrl = reservation.kitchen_pictures[0].url
  const currentKitchenId = reservation.kitchen.id

  const previouslyReviewedKitchenIds = currentUser.reviewed_kitchens.map(k => k.id)
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
            {humanize(reservation.date)}
          </Card.Header>
          <Card.Meta>
            <Link to={kitchenUrl}>
              <span className='date'>{reservation.kitchen.title}</span>
            </Link>
          </Card.Meta>
          <Card.Description>
            {reservation.kitchen.blurb}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>{reservation.guest_number} guests</a>
        </Card.Content>
        {prior && !previouslyReviewed ?
          <ReviewForm reservation={reservation} />
        : null}
        {prior && previouslyReviewed ?
          <Button disabled>You previously reviewed this kitchen</Button>
        : null}

      </Card>
      <br/><br/><br/>
    </div>
  )
}
