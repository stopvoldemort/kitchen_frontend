import React, { Component } from 'react'
import { Form, Header, Checkbox, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { editKitchen, clearKitchenList } from '../../actions/kitchens.js'
// import { editKitchenFromCurrentUser } from '../../actions/users.js'
import { Redirect } from 'react-router-dom'
import { Loading } from '../kitchenList/Loading.js'
import { AddKitchenPics } from './AddKitchenPics.js'
import ExternalAPI from '../../services/ExternalAPI.js'


class CreateKitchenForm extends Component {

  state = {
    ...this.props.selectedKitchen,
    kitchen_pictures: this.props.selectedKitchenPictures
  }

  checkPositive = (num) => {return (num>0) ? true : false}

  handleInputChange = (ev) => {
    const target = ev.target;
    const name = target.name
    const value = target.value
    if (target.type==='checkbox') return null
    else if (target.type==='number') {
      const newNum = parseInt(value, 10)
      if (this.checkPositive(newNum)) this.setState({[name]: newNum})
      if ([name]==="zipcode") return null
    } else {this.setState({[name]: value})}
  }

  handleZipBlur = (ev) => {
    const zip = ev.target.value
    const isZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)
    if (isZip) this.setState({zipcode: zip})
    else this.setState({zipcode: ""})
  }

  handleFoodProcessorChange = (ev) => {this.setState({food_processor : !this.state.food_processor})}
  handleStandingMixerChange = (ev) => {this.setState({standing_mixer : !this.state.standing_mixer})}
  handleDeepFryerChange = (ev) => {this.setState({deep_fryer : !this.state.deep_fryer})}
  handlePressureCookerChange = (ev) => {this.setState({pressure_cooker : !this.state.pressure_cooker})}

  handleSubmit = (e) => {
    e.preventDefault()
    const kitchenObj = {kitchen: this.state}

    if (!kitchenObj.kitchen.kitchen_pictures.length) {
      const newImg = {url: "http://www.tourniagara.com/wp-content/uploads/2014/10/default-img.gif"}
      kitchenObj.kitchen.kitchen_pictures.push(newImg)
    }
    const address = this.createAddress()
    ExternalAPI.geocoder(address)
      .then(json => {
        const lat = json.results[0].geometry.location.lat
        const lng = json.results[0].geometry.location.lng
        kitchenObj.kitchen.latitude = lat
        kitchenObj.kitchen.longitude = lng
        this.props.editKitchen(kitchenObj)
        this.props.clearKitchenList()
        // Need to have it load, and then redirect to /mykitchens.
        // Maybe some state like "kitchen updated"
        // this.setState({redirectToKitchen: "/mykitchens"})
      })
  }

  createAddress = () => {
    const state = this.state
    return state.street_address + ", " + state.city + ", " + state.state + " " + state.zipcode
  }

  addImage = (imgUrl) => {
    const newImg = {url: imgUrl}
    this.setState({kitchen_pictures: [...this.props.kitchenPictures, newImg]})
  }

  render() {
    return (
      <div className="create-kitchen-container">
        {(this.props.isLoading) ? <Loading /> : null}
        <Form onChange={this.handleInputChange} onSubmit={this.handleSubmit}>
          <Form.Input required name="title" label='Title' value={this.state.title} placeholder='e.g. Dream kitchen in the Flatiron District'/>
          <Form.Input required name="blurb" label="Blurb" value={this.state.blurb} placeholder='e.g. A fully modern kitchen for feeding large groups of friends and family.'/>

          <Divider section hidden />

          <Header as="h3">Address</Header>
          <Form.Input required name="street_address" label='Street' value={this.state.street_address} placeholder='e.g. 1 East 75th St.'/>
          <Form.Group widths='equal'>
            <Form.Input required name="city" label='City' value={this.state.city} placeholder='e.g. New York'/>
            <Form.Input required name="state" label='State' value={this.state.state} placeholder='e.g. NY'/>
            <Form.Input required name="zipcode" label='Zip Code' onBlur={this.handleZipBlur} value={this.state.zipcode} placeholder='e.g. 10021'/>
          </Form.Group>

          <Divider section hidden />

          <Header as="h3">Kitchen Details</Header>
          <Form.TextArea name="description" value={this.state.description} placeholder='Tell us about your kitchen...'/>
          <Form.Group widths='equal'>
            <Form.Input required name="size" label="Size of Kitchen (Sq Ft)" value={this.state.size} type="number" placeholder='How many square feet?'/>
            <Form.Input required name="max_guests" label="Maximum Number of Guests" value={this.state.max_guests} type="number" placeholder='Maximum number of guests'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input name="pots" label="Pots" value={this.state.pots} placeholder='e.g., AllClad, Steel'/>
            <Form.Input name="pans" label="Pans" value={this.state.pans} placeholder='e.g., Lodge, Castiron'/>
            <Form.Input name="knives" label="Knife Set" value={this.state.knives} placeholder='e.g., Wusthof'/>
          </Form.Group>
          <Header as="h4">Does your kitchen have a...</Header>
          <Form.Group widths='equal'>
            <Form.Field name='food_processor' checked={this.state.food_processor} control={Checkbox} onChange={this.handleFoodProcessorChange} label={{children: "Food Processor"}}/>
            <Form.Field name="standing_mixer" checked={this.state.standing_mixer} control={Checkbox} onChange={this.handleStandingMixerChange} label={{children: "Standing Mixer"}}/>
            <Form.Field name="pressure_cooker" checked={this.state.pressure_cooker} control={Checkbox}  onChange={this.handlePressureCookerChange} label={{children: "Pressure Cooker"}}/>
            <Form.Field name="deep_fryer" checked={this.state.deep_fryer} control={Checkbox} onChange={this.handleDeepFryerChange} label={{children: "Deep Fryer"}}/>
          </Form.Group>

          <Divider section hidden />

          <Header as="h3">Booking Details</Header>
          <Form.Group widths='equal'>
            <Form.Input required name="base_price" label="Minimum price (for 2 guests)" value={this.state.base_price} icon='dollar' iconPosition='left' placeholder="Base price" type="number"/>
            <Form.Input required name="price_per_guest" label="Premium for each additional guest" value={this.state.price_per_guest} icon='dollar' iconPosition='left' placeholder='Price per guest' type="number"/>
          </Form.Group>

          <Divider section hidden />

          <Header as="h3">Add Pictures</Header>
          <AddKitchenPics savedPics={this.props.kitchenPictures} addImage={this.addImage}/>

          <Divider section hidden />

          <Form.Button primary>Update Kitchen</Form.Button>
        </Form>
        {(this.props.kitchenUpdated) ? <Redirect push to="/mykitchens"/> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    currentUser: state.user.currentUser,
    selectedKitchen: state.kitchens.selectedKitchen,
    selectedKitchenPictures: state.kitchens.selectedKitchenPictures,
    kitchenUpdated: state.kitchens.kitchenUpdated
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    editKitchen: (kitchenObj) => dispatch(editKitchen(kitchenObj)),
    // editKitchenFromCurrentUser: (kitchenObj) => dispatch(editKitchenFromCurrentUser(kitchenObj)),
    clearKitchenList: () => dispatch(clearKitchenList())
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateKitchenForm)
