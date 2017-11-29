import React, { Component } from 'react'
import { Form, Header, Checkbox, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { createKitchen } from '../../actions/kitchens.js'
import { Redirect } from 'react-router-dom'
import { Loading } from '../kitchenList/Loading.js'
import { AddKitchenPics } from './AddKitchenPics.js'


class CreateKitchenForm extends Component {

  state = {
    title: "",
    blurb: "",
    street_address: "",
    city: "",
    state: "",
    zipcode: 0,
    description: "",
    size: "",
    max_guests: "",
    knives: "",
    pots: "",
    pans: "",
    food_processor: false,
    standing_mixer: false,
    deep_fryer: false,
    pressure_cooker: false,
    base_price: 0,
    price_per_guest: 0,

    kitchen_pictures: [],

    redirectToKitchen: false
  }

  handleTitleChange = (e, { value }) => this.setState({ title: value })
  handleBlurbChange = (e, { value }) => this.setState({ blurb: value })
  handleStreetChange = (e, { value }) => this.setState({ street_address: value })
  handleCityChange = (e, { value }) => this.setState({ city: value })
  handleStateChange = (e, { value }) => this.setState({ state: value })
  handleZipChange = (e, { value }) => this.setState({ zipcode: value })
  handleDescriptionChange = (e, { value }) => this.setState({ description: value })
  handleSizeChange = (e, { value }) => this.setState({ size: value })
  handleMaxGuestsChange = (e, { value }) => this.setState({ max_guests: value })
  handleKnivesChange = (e, { value }) => this.setState({ knives: value })
  handlePotsChange = (e, { value }) => this.setState({ pots: value })
  handlePansChange = (e, { value }) => this.setState({ pans: value })
  handleProcessorChange = () => this.setState({ food_processor: !this.state.food_processor})
  handleMixerChange = () => this.setState({ standing_mixer: !this.state.standing_mixer})
  handleFryerChange = () => this.setState({ deep_fryer: !this.state.deep_fryer})
  handlePressureCookerChange = () => this.setState({ pressure_cooker: !this.state.pressure_cooker})
  handleBasePriceChange = (e, { value }) => this.setState({ base_price: value })
  handleGuestPriceChange = (e, { value }) => this.setState({ price_per_guest: value })

  handleSubmit = (e) => {
    e.preventDefault()
    const kitchenObj = {kitchen: this.state}
    kitchenObj.kitchen.owner_id = this.props.currentUser.id

    console.log(kitchenObj);
    this.props.createKitchen(kitchenObj)
  }

  componentDidUpdate = () => {
    if (this.props.selectedKitchen.id) {
      this.setState({redirectToKitchen: `/kitchens/${this.props.selectedKitchen.id}`})
    }
  }

  addImage = (imgUrl) => {
    const newImg = {url: imgUrl}
    this.setState({kitchen_pictures: [...this.state.kitchen_pictures, newImg]})
  }

  // NEED TO MAKE FIELDS REQUIRED

  render() {
    return (
      <div className="create-kitchen-container">
        {(this.props.isLoading) ? <Loading /> : null}
        <Form onSubmit={this.handleSubmit}>
          <Form.Input placeholder='Give your kitchen a title' onChange={this.handleTitleChange} />
          <Form.Input placeholder='Give a brief description of your kitchen' onChange={this.handleBlurbChange} />

          <Divider section hidden />

          <Header as="h3">Address</Header>
          <Form.Input label='Street' placeholder='e.g. 1 East 75th St.' onChange={this.handleStreetChange} />
          <Form.Group widths='equal'>
            <Form.Input label='City' placeholder='e.g. New York' onChange={this.handleCityChange} />
            <Form.Input label='State' placeholder='e.g. NY' onChange={this.handleStateChange} />
            <Form.Input type="number" label='Zip Code' placeholder='e.g. 10021' onChange={this.handleZipChange} />
          </Form.Group>

          <Divider section hidden />

          <Header as="h3">Kitchen Details</Header>
          <Form.TextArea placeholder='Tell us about your kitchen...' onChange={this.handleDescriptionChange} />
          <Form.Group widths='equal'>
            <Form.Input label="Size" type="number" placeholder='How many square feet?' onChange={this.handleSizeChange} />
            <Form.Input label="Guests" type="number" placeholder='Maximum number of guests' onChange={this.handleMaxGuestsChange} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input label="Pots" placeholder='e.g., AllClad, Steel' onChange={this.handlePotsChange} />
            <Form.Input label="Pans" placeholder='e.g., Lodge, Castiron' onChange={this.handlePansChange} />
            <Form.Input label="Knife Set" placeholder='e.g., Wusthof' onChange={this.handleKnivesChange} />
          </Form.Group>
          <Header as="h4">Does your kitchen have a...</Header>
          <Form.Group widths='equal'>
            <Form.Field control={Checkbox} label={{children: "Food Processor"}} onChange={this.handleProcessorChange}/>
            <Form.Field control={Checkbox} label={{children: "Standing Mixer"}} onChange={this.handleMixerChange}/>
            <Form.Field control={Checkbox} label={{children: "Pressure Cooker"}} onChange={this.handlePressureCookerChange}/>
            <Form.Field control={Checkbox} label={{children: "Deep Fryer"}} onChange={this.handleFryerChange}/>
          </Form.Group>

          <Divider section hidden />

          <Header as="h3">Booking Details</Header>
          <Form.Group widths='equal'>
            <Form.Input placeholder="Base price" type="number" onChange={this.handleBasePriceChange} />
            <Form.Input placeholder='Price per guest' type="number" onChange={this.handleGuestPriceChange} />
          </Form.Group>

          <Divider section hidden />

          <Header as="h3">Add Pictures</Header>
          <AddKitchenPics addImage={this.addImage}/>

          <Divider section hidden />

          <Form.Button primary>Add Kitchen</Form.Button>
        </Form>
        {(this.state.redirectToKitchen) ? <Redirect push to={this.state.redirectToKitchen}/> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    selectedKitchen: state.kitchens.selectedKitchen,
    isLoading: state.kitchens.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    createKitchen: (kitchenObj) => dispatch(createKitchen(kitchenObj))
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateKitchenForm)
