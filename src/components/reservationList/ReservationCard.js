import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ReviewForm from '../reviews/ReviewForm.js'

const picUrl = "http://hgtvhome.sndimg.com/content/dam/images/hgtv/editorial/blogs/unsized/Kayla/RX-Frigidaire_kitchen-design-ideas_3.jpg"

export const ReservationCard = ({ reservation, prior }) => {

  // Note: 'prior' is an optional argument that is either true or undefined

  const humanize = (date) => {
    let dateArr = date.split("-")
    const months = ["I am a month that will never be", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[parseInt(dateArr[1],10)] + " " + dateArr[2] + ", " + dateArr[0]
  }

  const kitchenUrl = `/kitchens/${reservation.kitchen.id}`

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
        {prior ?
          <ReviewForm reservation={reservation} />
        : null}
      </Card>
      <br/><br/><br/>
    </div>
  )
}
