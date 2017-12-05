import React from 'react'
import { MessageCard } from './MessageCard.js'
import MessageForm from './MessageForm.js'
import cuid from 'cuid'

export const MessageList = ({ messages, currentUser, createMessage }) => {

  const messageCards = messages.map(message => (
    <MessageCard
      currentUser={currentUser}
      message={message}
      key={cuid()}
      />
  ))


  return (
    <div>
      {messageCards}
      <MessageForm
        createMessage={createMessage}
      />
    </div>
  )
}
