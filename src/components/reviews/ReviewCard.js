import React from 'react'
import { Card } from 'semantic-ui-react'


export const ReviewCard = ({ review }) => {

  const stars = `${review.stars} stars`

  return (
    <Card fluid >
       <Card.Content header={stars} />
       <Card.Content description={review.review} />
     </Card>
  )
}
