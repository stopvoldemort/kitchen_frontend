import React, { Component } from 'react'
import { ShowImage } from './ShowImage.js'
import { Divider, Segment } from 'semantic-ui-react'
import ReactStars from 'react-stars'


export default class KitchenShowHeader extends Component {

  state = {
    picNum: 0
  }

  handleClick = () => {
    const kitchen = this.props.kitchen
    if ((this.state.picNum + 1) < kitchen.kitchen_pictures.length) {
      const newNum = this.state.picNum + 1
      this.setState({picNum: newNum})
    } else {this.setState({picNum: 0})}
  }


  avgRating = () => {
    const kitchen = this.props.kitchen
    const numReviews = kitchen.reviews.length
    if (numReviews) {
      const totalStars = kitchen.reviews.reduce((sum, review) => (sum + review.stars), 0)
      const avg = totalStars / numReviews
      return (
        <div>
          <ReactStars edit={false} value={avg}/>
          <span>{numReviews} review{numReviews>1 ? "s":null} </span>
        </div>
      )
    } else return "No reviews"
  }

  render() {
    const kitchen = this.props.kitchen

    return (
      <div>
        <Segment>
          {(!kitchen.kitchen_pictures.length) ? null :
            <ShowImage picUrl={kitchen.kitchen_pictures[this.state.picNum].url} handleClick={this.handleClick} />
          }
          <Divider fitted />
          <h1>{kitchen.title}</h1>
          <a>{this.avgRating()}</a>
          <br/>
          <div>Up to {kitchen.max_guests} guests || {kitchen.size} square feet</div>
          <div>{kitchen.street_address}, {kitchen.city}, {kitchen.state} {kitchen.zipcode}</div>
        </Segment>
      </div>
    )

  }

}
