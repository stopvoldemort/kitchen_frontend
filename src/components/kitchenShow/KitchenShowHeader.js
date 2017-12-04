import React, { Component } from 'react'
import { ShowImage } from './ShowImage.js'
import { Divider, Segment } from 'semantic-ui-react'
import ReactStars from 'react-stars'


export default class KitchenShowHeader extends Component {

  state = {
    picNum: 0
  }

  handleRightClick = () => {
    if ((this.state.picNum + 1) < this.props.pictures.length) {
      const newNum = this.state.picNum + 1
      this.setState({picNum: newNum})
    } else {this.setState({picNum: 0})}
  }

  handleLeftClick = () => {
    if (this.state.picNum > 0) {
      const newNum = this.state.picNum - 1
      this.setState({picNum: newNum})
    } else {this.setState({picNum: this.props.pictures.length - 1})}
  }


  avgRating = () => {
    const reviews = this.props.reviews
    const numReviews = reviews.length
    if (numReviews) {
      const totalStars = reviews.reduce((sum, review) => (sum + review.stars), 0)
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
          {(!this.props.pictures.length) ? null :
            <ShowImage
              picUrl={this.props.pictures[this.state.picNum].url}
              handleRightClick={this.handleRightClick}
              handleLeftClick={this.handleLeftClick}
              kitchenHasMultiplePics={this.props.pictures.length > 1}
            />
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
