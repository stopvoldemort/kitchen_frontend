import React from 'react'
import { ShowImage } from './ShowImage.js'
import { Divider, Segment } from 'semantic-ui-react'

export const KitchenShowHeader = ( {kitchen} ) => {

  const avgRating = () => {
    if (kitchen.reviews.length) {
      const totalStars = kitchen.reviews.reduce((sum, review) => (sum + review.stars), 0)
      return `${(totalStars/kitchen.reviews.length)} stars`
    } else return "No reviews"
  }

  return (
    <div>
      <Segment>
        <ShowImage />
        <Divider fitted />
        <h1>{kitchen.title}</h1>
        <a>
          <i className="star icon"></i>
          {avgRating()}
        </a>
        <br/>
        <div>Up to {kitchen.max_guests} guests || {kitchen.size} square feet</div>
        <div>{kitchen.street_address}, {kitchen.city}, {kitchen.state} {kitchen.zipcode}</div>
      </Segment>
    </div>
  )
}
