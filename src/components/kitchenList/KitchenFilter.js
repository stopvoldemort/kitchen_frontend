import React, { Component } from 'react'
import { Checkbox, Form, Input } from 'semantic-ui-react'


export class KitchenFilter extends Component {

  state = {
    filters: {
      equipment: {
        food_processor: false,
        standing_mixer: false,
        deep_fryer: false,
        pressure_cooker: false,
        guests: 0
      }
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
    const newState = JSON.parse(JSON.stringify(this.state))
    newState.filters.equipment[filter] = !this.state.filters.equipment[filter]
    this.setState(newState, () => {
      this.props.importFilters(this.state.filters)
    })
  }

  // THIS IS WHERE YOU LEFT OFF MAKING FILTERS
  handleInputChange = (ev) => {
    console.log(ev.target.value);
    console.log(ev.target.name);
    this.setState({})
  }

  render() {
    return (
      <div>
        <h3>Filter Results</h3>
        <h4>Equipment</h4>
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
          <Form.Field>
            <label>Numbers of guests</label>
            <Input onChange={this.handleInputChange} name="guests" type="number" value={this.state.guests} />
          </Form.Field>
        </Form>
      </div>
    )
  }
}
