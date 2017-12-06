import React from 'react'
import { MyKitchensReservationCard } from './MyKitchensReservationCard.js'
import cuid from 'cuid'

export const MyKitchensReservationList = (props) => {

  const reservationCards = () => {
    const sortedReservations = props.selectedKitchenReservations.sort(compareDescending)
    return sortedReservations.map(res => (
      <MyKitchensReservationCard
      reservation={res}
      key={cuid()}
      messages={props.selectedKitchenMessages.filter(m => m.reservation_id===res.id)}
      guest={props.selectedKitchenGuests.find(g => res.guest_id===g.id)}
      currentUser={props.currentUser}
      />
    ))
  }

  const turnStringDatesToNumbers = (dateString) => {
    const dateArr = dateString.split("-")
    const parsedDateArr = dateArr.map(n => parseInt(n, 10))
    return ((parsedDateArr[0]*10000) + (parsedDateArr[1]*100) + (parsedDateArr[2]*1))
  }

  const compareDescending = (a,b) => (
    turnStringDatesToNumbers(b.date) - turnStringDatesToNumbers(a.date)
  )


  return (
    <div>
      {reservationCards()}
    </div>
  )
}
