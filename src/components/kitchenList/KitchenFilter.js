import React, { Component } from 'react'
import { Checkbox, Form } from 'semantic-ui-react'


export class KitchenFilter extends Component {

  state = {
    equipment: {
      food_processor: false,
      standing_mixer: false,
      deep_fryer: false,
      pressure_cooker: false
    }
  }

  dehumanize = (str) => {
    var frags = str.split(' ');
    for (let i=0; i<frags.length; i++) {
      frags[i] = frags[i].charAt(0).toLowerCase() + frags[i].slice(1);
    }
    return frags.join('_');
  }

  handleEquipmentChange = (ev) => {
    const filter = this.dehumanize(ev.target.innerText)
    const newEquipment = Object.assign({}, this.state.equipment)
    newEquipment[filter] = !this.state.equipment[filter]
    this.setState({equipment: newEquipment}, () => {
      this.props.importFilters(this.state.equipment)
    })
  }

  render() {
    return (
      <div>
        <h3>Filter</h3>
        <h4>By Equipment</h4>
        <Form>
          <Form.Field onChange={this.handleEquipmentChange}
            control={Checkbox}
            label={{ children: 'Food Processor' }}
          />
          <Form.Field onChange={this.handleEquipmentChange}
            control={Checkbox}
            label={{ children: 'Standing Mixer' }}
          />
          <Form.Field onChange={this.handleEquipmentChange}
            control={Checkbox}
            label={{ children: 'Deep Fryer' }}
          />
          <Form.Field onChange={this.handleEquipmentChange}
            control={Checkbox}
            label={{ children: 'Pressure Cooker' }}
          />
        </Form>
      </div>
    )
  }
}
