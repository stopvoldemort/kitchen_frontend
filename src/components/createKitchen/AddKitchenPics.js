import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { KitchenPic } from './KitchenPic.js'
import cuid from 'cuid'
import { Grid } from 'semantic-ui-react'

const CLOUDINARY_UPLOAD_PRESET = 'rzj0ppvh';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dwtfwfzsx/upload';


export class AddKitchenPics extends Component {

  state = {images: []}

  componentDidMount = () => {
    const savedPics = this.props.savedPics
    if (savedPics) {
      const savedPicObjs = this.props.savedPics.map(pic => ({picUrl: pic.url, name: cuid()}))
      this.setState({images: savedPicObjs})
    }
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
      if (response.body.secure_url !== '') {
        const newPic = {picUrl: response.body.secure_url, name: file.name}
        this.setState({
          images: [...this.state.images, newPic]
        })
        this.props.addImage(newPic.picUrl)
      }
    });
  }

  removeImage = (name) => {
    const newImages = this.state.images.filter(image => (image.name!==name))
    this.setState({images: newImages})
  }

  imgPreviews = () => {
    if (!this.state.images.length) return null
    else {
      return this.state.images.map(img => (
        <KitchenPic key={cuid()} name={img.name} picUrl={img.picUrl} removeImage={this.removeImage}/>
      ))
    }
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
        <Grid>
          <Grid.Row columns={8} >
            {this.imgPreviews()}
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
