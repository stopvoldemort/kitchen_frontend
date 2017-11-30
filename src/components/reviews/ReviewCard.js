import React from 'react'
import { Card } from 'semantic-ui-react'
import ReactStars from 'react-stars'



export const ReviewCard = ({ review }) => {

  const humanize = (date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const monthIdx = parseInt(date.split("-")[1], 10) - 1
    const year = date.split("-")[0]

    return months[monthIdx] + " " + year
  }


  return (
    <Card fluid >
      <Card.Content header={`${review.guest} says...`} />
      <Card.Content description={review.review} />
      <Card.Content><ReactStars value={review.stars} edit={false}/></Card.Content>
      <Card.Content extra>{humanize(review.created_at)}</Card.Content>
    </Card>
  )
}
