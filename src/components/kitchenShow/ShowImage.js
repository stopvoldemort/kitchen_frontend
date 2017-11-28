import React from 'react'
import '../../style/show.css'
import { Image } from 'semantic-ui-react'


export const ShowImage = (props) => {

  const clickedMe = () => {
    props.handleClick()
  }


  return (
    <div onClick={clickedMe} className="image frame-square">
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
