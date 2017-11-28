import React from 'react'
import { Grid } from 'semantic-ui-react'
import '../../style/show.css'


export const EquipmentList = ({ kitchen }) => {
  return (
    <Grid divided='vertically'>
      <Grid.Row columns={2}>
        <Grid.Column>
          <p className={(kitchen.food_processor) ? "yes" : "no"}>Food Processor</p>
          <p className={(kitchen.deep_fryer) ? "yes" : "no"}>Deep Fryer</p>
          <p className={(kitchen.pressure_cooker) ? "yes" : "no"}>Pressure Cooker</p>
          <p className={(kitchen.standing_mixer) ? "yes" : "no"}>Standing Mixer</p>
        </Grid.Column>
        <Grid.Column>
          <p>Pots: {kitchen.pots}</p>
          <p>Pans: {kitchen.pans}</p>
          <p>Knife set: {kitchen.knives}</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
