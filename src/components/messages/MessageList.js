import React from 'react'
import { MessageCard } from './MessageCard.js'
import cuid from 'cuid'

export const MessageList = ({ messages }) => {

  const messageCards = messages.map(message => <MessageCard message={message} key={cuid()}/>)

  return (
    <div>
      {messageCards}
    </div>
  )
}
