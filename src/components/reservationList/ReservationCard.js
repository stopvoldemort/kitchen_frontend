import React from 'react'
import { Card, Image } from 'semantic-ui-react'


export const ReservationCard = ({ reservation }) => {

  const humanize = (date) => {
    let dateArr = date.split("-")
    const months = ["I am a month that will never be", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[dateArr[1]] + " " + dateArr[2] + ", " + dateArr[0]
  }

  const picUrl = "http://hgtvhome.sndimg.com/content/dam/images/hgtv/editorial/blogs/unsized/Kayla/RX-Frigidaire_kitchen-design-ideas_3.jpg"

  return (
    <Card centered>
      <Image src={picUrl} />
      <Card.Content>
        <Card.Header>
          {humanize(reservation.date)}
        </Card.Header>
        <Card.Meta>
          <span className='date'>{reservation.kitchen.title}</span>
        </Card.Meta>
        <Card.Description>
          {reservation.kitchen.blurb}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>{reservation.guest_number} guests</a>
      </Card.Content>
    </Card>
  )
}
