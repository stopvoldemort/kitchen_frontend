import React from 'react'
import { Card } from 'semantic-ui-react'
import ReactStars from 'react-stars'



export const ReviewCard = ({ review }) => {


  return (
    <Card fluid >
      <Card.Content>
        <ReactStars value={review.stars} edit={false}/>
      </Card.Content>
      <Card.Content description={review.review} />
    </Card>
  )
}
