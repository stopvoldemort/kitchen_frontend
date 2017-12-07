import React from 'react'
import KitchenCard from './KitchenCard.js'
import { Card, Header } from 'semantic-ui-react'
import cuid from 'cuid'


export const KitchenList = (props) => {


  const unreadMessagesForKitchen = (kitchenID) => {
    if (props.kitchenReservations) {
      const reservations = props.kitchenReservations.filter(r => (
        r.kitchen_id === kitchenID
      ))
      const unread = reservations.reduce((agg, r) => (
        [...agg, ...unreadMessagesForReservation(r.id)]
      ), [])
      return unread.length
    } return null
  }

  const unreadMessagesForReservation = (reservationID) => (
    props.receivedMessages.filter(m => (m.reservation_id === reservationID && !m.read))
  )

  const kitchenCards = () => {
    const sortedKitchens = props.kitchens.reduce((agg, kitchen) => {
      if (kitchen.id!==props.selectedKitchenID) {
        return [...agg, kitchen]
      } else return [kitchen, ...agg]
    }, [])

    return sortedKitchens.map((kitchen) => {

      const reviews = props.kitchenReviews.filter(kr => kr.kitchen_id===kitchen.id)
      const pics = props.kitchenPictures.filter(kp => kp && kp.kitchen_id===kitchen.id)
      const pic = pics[0]

      return (
        <KitchenCard
          key={cuid()}
          currentUser={props.currentUser}
          kitchen={ kitchen }
          deleteKitchen={props.deleteKitchen}
          pic={pic}
          reviews={reviews}
          clickedShowReservations={props.clickedShowReservations}
          unreadNum={unreadMessagesForKitchen(kitchen.id)}
          selectedKitchenID={props.selectedKitchenID}
        />
      )
    })
  }

  return (
    <Card.Group itemsPerRow={1} >
      { props.kitchens.length ?
        kitchenCards() :
        <div>
          <br/><br/>
          <Header as="h3">No kitchens available. Please search for a new location.</Header>
          <br/><br/>
        </div>
      }
    </Card.Group>
  )
}
