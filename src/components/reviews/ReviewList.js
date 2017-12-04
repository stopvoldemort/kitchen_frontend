import React from 'react'
import { ReviewCard } from './ReviewCard.js'
import cuid from 'cuid'

export const ReviewList = ({ reviews, reviewAuthors }) => {

  const reviewCards = () => {
    return reviews.map(review => {
      const guest = reviewAuthors.find(ra => ra.id===review.guest_id)
      return <ReviewCard key={cuid()} review={review} reviewAuthor={guest} />
    })
  }

  return (
    <div>
      {reviewCards()}
    </div>
  )
}
