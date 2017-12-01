import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Button } from 'semantic-ui-react'
import ReactStars from 'react-stars'

const KitchenCard = ({ kitchen, currentUser, deleteKitchen, editKitchen }) => {

  const handleDeleteClick = () => deleteKitchen(kitchen.id)

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

  return (
    <Card fluid>
      <Image src={kitchen.kitchen_pictures[0].url} />
      <Card.Content>
          <Card.Header>
            <Link to={`/kitchens/${kitchen.id}`} >
              {kitchen.title}
            </Link>
          </Card.Header>
        <Card.Meta>Up to {kitchen.max_guests} guests</Card.Meta>
        <Card.Meta>${kitchen.base_price} to ${maxPrice}</Card.Meta>
        <Card.Description>{kitchen.blurb}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>{avgRating()}</a>
      </Card.Content>
      {(!currentUser) ? null : (
        <Card.Content>
          <Link to={`/mykitchens/${kitchen.id}`}>
            <Button>Edit Your Kitchen</Button>
          </Link>
          <Button onClick={handleDeleteClick}>Remove Your Kitchen</Button>
        </Card.Content>
      )}
    </Card>  )
}



export default KitchenCard
