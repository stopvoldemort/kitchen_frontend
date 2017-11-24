import React from 'react'
import KitchenCard from './KitchenCard.js'
import cuid from 'cuid'


export const KitchenList = (props) => {

  const kitchenCards = () => {
    return props.kitchens.map((kitchen) => <KitchenCard key={cuid()} kitchen={ kitchen }/>)
  }

  return (
    <div>
      { props.kitchens ? kitchenCards() : <p>Loading...</p>}
    </div>
  )
}
