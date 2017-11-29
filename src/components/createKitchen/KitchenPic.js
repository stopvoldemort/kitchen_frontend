import React from 'react'
import { Image, Grid, Icon } from 'semantic-ui-react'

export const KitchenPic = ({ name, picUrl, removeImage }) => {

  const handleClick = () => {
    removeImage(name)
  }

  return (
    <Grid.Column>
      <Image size="small" floated="left" bordered src={picUrl} alt={name} />
      <p><Icon link onClick={handleClick} name="remove"/>{name}</p>
    </Grid.Column>
  )
}
