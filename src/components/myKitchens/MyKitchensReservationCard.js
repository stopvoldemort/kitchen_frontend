import React from 'react'
import { Card, Button} from 'semantic-ui-react'
import '../../style/kitchenList.css'

export const MyKitchensReservationCard = (props) => {

  const unreadMessages = () => (
    props.messages.filter(m => (
      !m.read && m.recipient_id===props.currentUser.id
    ))
  )

  const unreadMessagesNote = () => {
    const unread = unreadMessages()
    if (unread.length===1) return `You have 1 new messages`
    if (unread.length===0) return `You have no new messages`
    else return `You have ${unread.length} new messages`
  }

  const humanize = (date) => {
    let dateArr = date.split("-")
    const months = ["I am a month that will never be", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[parseInt(dateArr[1],10)] + " " + dateArr[2] + ", " + dateArr[0]
  }

  return (
    <div>
      <br/>
      <Card centered>
        <img src={props.guest.pic_url} alt="" className="guest-pic"  />
        <Card.Content>
          <Card.Header>
            {humanize(props.reservation.date)}
          </Card.Header>
          <Card.Meta>
            <span className='date'>{props.guest.name}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          {props.reservation.guest_number} guests
        </Card.Content>
        <Card.Content>
          <Button fluid>
            {unreadMessagesNote()}
          </Button>
        </Card.Content>
      </Card>
      <br/>
    </div>
  )
}
