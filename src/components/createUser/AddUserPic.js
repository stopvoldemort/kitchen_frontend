import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { Image } from 'semantic-ui-react'

const CLOUDINARY_UPLOAD_PRESET = 'rzj0ppvh';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dwtfwfzsx/upload';


export default class AddKitchenPics extends Component {

  constructor(props) {
    super(props);

    this.state = {
      url: ""
    };
  }

  onImageDrop = (files) => {
    this.setState({uploadedFile: files[0]});
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);
    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      if (response.body.secure_url !== '') {
        this.setState({
          url: response.body.secure_url
        })
        this.props.addImage(response.body.secure_url)
      }
    });
  }

  render() {
    return (
      <div>
        <div className="FileUpload">
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop}>
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
        </div>
        <div>
          <Image size="small" floated="left" bordered src={this.state.url} />
        </div>
      </div>
    )
  }
}
