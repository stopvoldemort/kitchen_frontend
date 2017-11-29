import React from 'react'
import KitchenCard from './KitchenCard.js'
import { Card } from 'semantic-ui-react'
import cuid from 'cuid'


export const KitchenList = (props) => {

  const kitchenCards = () => {
    const sortedKitchens = props.kitchens.reduce((agg, kitchen) => {
      if (kitchen.id!==props.selectedKitchenID) {
        return [...agg, kitchen]
      } else return [kitchen, ...agg]
    }, [])
    return sortedKitchens.map((kitchen) => <KitchenCard key={cuid()} kitchen={ kitchen }/>)
  }

  return (
    <Card.Group itemsPerRow={1} >
      { props.kitchens.length ? kitchenCards() : <p>No kitchens available near that location.</p>}
    </Card.Group>
  )
}
