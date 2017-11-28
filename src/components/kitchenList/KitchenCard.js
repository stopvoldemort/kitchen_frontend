import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react'
import ReactStars from 'react-stars'

const KitchenCard = ({ kitchen }) => {

  const maxPrice = kitchen.base_price + (kitchen.price_per_guest * kitchen.max_guests)

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

  const picUrl = "http://hgtvhome.sndimg.com/content/dam/images/hgtv/editorial/blogs/unsized/Kayla/RX-Frigidaire_kitchen-design-ideas_3.jpg"

  return (
    <Card>
      <Image src={picUrl} />
      <Card.Content>
        <Link className="header" to={`/kitchens/${kitchen.id}`} >
          <Card.Header>{kitchen.title}</Card.Header>
        </Link>
        <Card.Meta>Up to {kitchen.max_guests} guests</Card.Meta>
        <Card.Meta>${kitchen.base_price} to ${maxPrice}</Card.Meta>
        <Card.Description>{kitchen.blurb}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>{avgRating()}</a>
      </Card.Content>
    </Card>  )
}



export default KitchenCard
