import React from 'react'
import '../../style/show.css'


export const ShowImage = (props) => {

  const picUrl = "http://hgtvhome.sndimg.com/content/dam/images/hgtv/editorial/blogs/unsized/Kayla/RX-Frigidaire_kitchen-design-ideas_3.jpg"

  return (
    <div className="image frame-square">
      <div className="image crop">
    		    <img src={picUrl} alt="cropped kitchen" title="kitchen" />
    	  </div>
    </div>
  )
}
