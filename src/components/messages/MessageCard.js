import React from 'react'
import { Card } from 'semantic-ui-react'

export const MessageCard = ({ message }) => {

  return (
    <Card>
      <Card.Content header='Received Message' />
      <Card.Content description={message.content} />
    </Card>
  )
}
