import React from 'react'
import '../../style/show.css'
import { Image, Icon } from 'semantic-ui-react'


export const ShowImage = (props) => {

  const clickedRight = () => {
    props.handleRightClick()
  }

  const clickedLeft = () => {
    props.handleLeftClick()
  }

  return (
    <div className="image frame-square">
      {(!props.kitchenHasMultiplePics) ? null :
        <div>
          <Icon onClick={clickedLeft} className="left-arrow" size="large" name="chevron left" />
          <Icon onClick={clickedRight} className="right-arrow" size="large" name="chevron right" />
        </div>
      }
      <Image
          centered
          className="title-image"
          height="100%"
          bordered
          src={props.picUrl}
          alt=""
        />
    </div>
  )

}
