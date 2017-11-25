import React from 'react'
import { ShowImage } from './ShowImage.js'
import { Divider, Segment } from 'semantic-ui-react'

export const KitchenShowHeader = (props) => {

  const avgRating = () => {
    const totalStars = props.kitchen.reviews.reduce((sum, review) => (sum + review.stars), 0)
    return (totalStars/props.kitchen.reviews.length)
  }

  return (
    <div>
      <Segment>
        <ShowImage />
        <Divider fitted />
        <h1>{props.kitchen.title}</h1>
        <a>
          <i className="star icon"></i>
          {avgRating()} stars
        </a>
        <br/>
        <div className="guest-max">
          Up to {props.kitchen.max_guests} guests
        </div>
      </Segment>
    </div>
  )
}
