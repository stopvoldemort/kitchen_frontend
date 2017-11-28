import React from 'react'
import { Image } from 'semantic-ui-react'

export const KitchenPic = ({ name, picUrl }) => {
  return (
    <div>
      <p>{name}</p>
      <Image size="small" floated="left" bordered src={picUrl} alt={name} />
    </div>
  )
}
