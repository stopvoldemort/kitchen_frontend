import React from 'react'
import { ShowImage } from './ShowImage.js'
import { Divider, Segment } from 'semantic-ui-react'
import ReactStars from 'react-stars'


export const KitchenShowHeader = ( {kitchen} ) => {

  const avgRating = () => {
    const numReviews = kitchen.reviews.length
    if (numReviews) {
      const totalStars = kitchen.reviews.reduce((sum, review) => (sum + review.stars), 0)
      const avg = totalStars / numReviews
      return (
        <div>
          <ReactStars edit={false} value={avg}/>
          <span>{numReviews} review{numReviews>1 ? "s":null} </span>
        </div>
      )
    } else return "No reviews"
  }

  return (
    <div>
      <Segment>
        <ShowImage />
        <Divider fitted />
        <h1>{kitchen.title}</h1>
        <a>{avgRating()}</a>
        <br/>
        <div>Up to {kitchen.max_guests} guests || {kitchen.size} square feet</div>
        <div>{kitchen.street_address}, {kitchen.city}, {kitchen.state} {kitchen.zipcode}</div>
      </Segment>
    </div>
  )
}
