import React from 'react'
import { Card } from 'semantic-ui-react'

export const MessageCard = ({ message, currentUser }) => {

  const header = (message.sender_id === currentUser.id) ? "Sent" : "Received"

  const date = () => {
    const d = new Date(message.milliseconds)
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    const day = d.getDate();
    const monthIndex = d.getMonth();
    const year = d.getFullYear();
    return monthNames[monthIndex] + ' ' + day + ', ' + year
  }

  const time = () => {
    const d = new Date(message.milliseconds)
    let hours = d.getHours()
    let ampm = "AM"
    if (hours > 12) {
      hours -= 12
      ampm = "PM"
    }
    const minutes = d.getMinutes()
    return hours + ":" + minutes + " " + ampm
  }

  return (
    <Card fluid raised>
      <Card.Content header={header}/>
      <Card.Meta>{date()}, {time()}</Card.Meta>
      <Card.Content description={message.content} />
    </Card>
  )
}
