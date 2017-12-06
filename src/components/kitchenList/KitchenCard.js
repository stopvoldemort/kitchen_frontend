import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Button } from 'semantic-ui-react'
import ReactStars from 'react-stars'

const KitchenCard = ({ kitchen, currentUser, deleteKitchen, editKitchen, pic, reviews, clickedShowReservations }) => {

  const handleDeleteClick = () => deleteKitchen(kitchen.id)
  const handleReservationsClick = () => clickedShowReservations(kitchen)

  const maxPrice = kitchen.base_price + (kitchen.price_per_guest * kitchen.max_guests)

  const avgRating = () => {
    const numReviews = reviews.length
    if (numReviews) {
      const totalStars = reviews.reduce((sum, review) => (sum + review.stars), 0)
      const avg = totalStars / numReviews
      return (
        <div>
          <ReactStars edit={false} value={avg}/>
          <span>{numReviews} review{numReviews>1 ? "s":null} </span>
        </div>
      )
    } else return "No reviews"
  }

  const picUrl = pic ? pic.url : "http://www.tourniagara.com/wp-content/uploads/2014/10/default-img.gif"

  return (
    <div>
      <br/>
      <Card fluid>
        <Image src={picUrl} />
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
          <div>
            <Card.Content>
              <Button primary size="huge" fluid onClick={handleReservationsClick}>Show Reservations</Button>
            </Card.Content>
            <br/>
            <Card.Content>
              <Link to={`/mykitchens/${kitchen.id}`}>
                <Button basic color="orange" floated="left">Edit Your Kitchen</Button>
              </Link>
              <Button negative basic floated="right" onClick={handleDeleteClick}>Remove Your Kitchen</Button>
            </Card.Content>
          </div>
        )}
      </Card>
      <br/>
    </div>
  )
}



export default KitchenCard
