import React from 'react'
import KitchenCard from './KitchenCard.js'
import { Card } from 'semantic-ui-react'
import cuid from 'cuid'


export const KitchenList = (props) => {

  const kitchenCards = () => {
    return props.kitchens.map((kitchen) => <KitchenCard key={cuid()} kitchen={ kitchen }/>)
  }

  return (
    <Card.Group itemsPerRow={1} >
      { props.kitchens ? kitchenCards() : <p>Loading...</p>}
    </Card.Group>
  )
}
