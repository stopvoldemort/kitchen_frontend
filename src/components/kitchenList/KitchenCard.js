import React from 'react'

const KitchenCard = ({ kitchen }) => {

  const maxPrice = kitchen.base_price + (kitchen.price_per_guest * kitchen.max_guests)

  const avgRating = () => {
    const totalStars = kitchen.reviews.reduce((sum, review) => (sum + review.stars), 0)
    return (totalStars/kitchen.reviews.length)
  }

  const picUrl = "http://hgtvhome.sndimg.com/content/dam/images/hgtv/editorial/blogs/unsized/Kayla/RX-Frigidaire_kitchen-design-ideas_3.jpg"

  return (
    <div className="ui card">
      <div className="image">
        <img src={picUrl} alt="pic"/>
      </div>
      <div className="content">
        <a className="header" href={`/kitchens/${kitchen.id}`} >{kitchen.title}</a>
        <div className="meta">
          <span className="date">${kitchen.base_price} to ${maxPrice}</span>
          <span className="date card-max-guests">Up to {kitchen.max_guests} guests</span>


        </div>
        <div className="description">{kitchen.blurb}</div>
      </div>
      <div className="extra content">
        <a>
          <i className="star icon"></i>
          {avgRating()} stars
        </a>
      </div>
    </div>
  )
}

export default KitchenCard
