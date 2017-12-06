import React, { Component } from 'react'
import { Checkbox, Form, Input, Label, Header } from 'semantic-ui-react'


export class KitchenFilter extends Component {

  state = {
    filters: {
      equipment: {
        food_processor: false,
        standing_mixer: false,
        deep_fryer: false,
        pressure_cooker: false
      },
      guests: 2,
      max_price: 500,
      min_price: 0
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
    this.setState(newState, () => {this.exportFilters()})
  }

  handleGuestChange = (ev) => {
    const value = parseInt(ev.target.value, 10)
    const newState = JSON.parse(JSON.stringify(this.state))
    newState.filters.guests = value
    if (value>=0) this.setState(newState, () => {this.exportFilters()})
  }


  handleMaxPriceChange = (ev) => {
    const value = parseInt(ev.target.value, 10)
    const newState = JSON.parse(JSON.stringify(this.state))
    newState.filters.max_price = value
    if (value>=0) this.setState(newState, () => {this.exportFilters()})
  }

  handleMinPriceChange = (ev) => {
    const value = parseInt(ev.target.value, 10)
    const newState = JSON.parse(JSON.stringify(this.state))
    newState.filters.min_price = value
    if (value>=0) this.setState(newState, () => {this.exportFilters()})
  }

  exportFilters = () => {this.props.importFilters(this.state.filters)}



  render() {
    return (
      <div>
        <Header as="h2">Filter</Header>
        <Form>
          <Form.Field>
            <Header as="h4">Numbers of guests</Header>
            <Input onChange={this.handleGuestChange} type="number" value={this.state.filters.guests} />
          </Form.Field>
          <Form.Field>
            <Header as="h4">Minimum Price</Header>
            <Input fluid labelPosition='left' onChange={this.handleMinPriceChange} type="number" value={this.state.filters.min_price}>
              <Label size="tiny">$</Label>
              <input step="10"/>
            </Input>
          </Form.Field>
          <Form.Field>
            <Header as="h4">Maximum Price</Header>
            <Input fluid labelPosition='left' onChange={this.handleMaxPriceChange} type="number" value={this.state.filters.max_price}>
              <Label size="tiny">$</Label>
              <input step="10"/>
            </Input>
          </Form.Field>
          <Header as="h3">Equipment</Header>
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
