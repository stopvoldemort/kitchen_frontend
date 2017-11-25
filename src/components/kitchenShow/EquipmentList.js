import React from 'react'
import '../../style/show.css'


export const EquipmentList = ({ kitchen }) => {
  console.log("kitchen", kitchen);


  return (
    <div className="equipment row">
      <p className={(kitchen.food_processor) ? "col-left yes" : "col-left no"}>Food Processor</p>
      <p className={(kitchen.deep_fryer) ? "col-left yes" : "col-left no"}>Deep Fryer</p>
      <p className={(kitchen.pressure_cooker) ? "col-left yes" : "col-left no"}>Pressure Cooker</p>
      <p className={(kitchen.standing_mixer) ? "col-left yes" : "col-left no"}>Standing Mixer</p>
      <br/><br/>
      <p className="col-right" >Pots: {kitchen.pots}</p>
      <p className="col-right" >Pans: {kitchen.pans}</p>
      <p className="col-right" >Knife set: {kitchen.knives}</p>
    </div>
  )
}
