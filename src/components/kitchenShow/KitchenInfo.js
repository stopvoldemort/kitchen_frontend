import React from 'react'
import { EquipmentList } from './EquipmentList.js'
import { ReviewList } from '../reviews/ReviewList.js'

export const KitchenInfo = ({ kitchen, reviews, reviewAuthors }) => {

  return (
    <div>
      <h2>Description</h2>
      <p>{kitchen.description}</p>
      <h2>Equipment</h2>
      <EquipmentList kitchen={kitchen} />
      <h2>Reviews</h2>
      <ReviewList reviews={reviews} reviewAuthors={reviewAuthors} />
    </div>
  )
}
