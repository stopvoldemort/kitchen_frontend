import React from 'react'
import { ReviewCard } from './ReviewCard.js'
import cuid from 'cuid'

export const ReviewList = ({ reviews }) => {

  const reviewCards = () => {
    return reviews.map(review => {
      return <ReviewCard key={cuid()} review={review} />
    })
  }

  return (
    <div>
      {reviewCards()}
    </div>
  )
}
