import React from 'react'
import styled from 'styled-components'

const ImageUploadFileWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
 > input {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    outline: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 99999;
 }
 > img {
    width: 100%;
    height: 100%;
    position: absolute;
 }
`

class ImageUploadFile extends React.Component {

  state = { image_url: this.props.image_url }

  onChangeImg = () => {
    this.readImage(image_url => this.setState({ image_url }))
  }

  readImage = (callback) => {
    if (!(this.input.files && this.input.files[0])) return false
    const reader = new FileReader()
    reader.onload = event => callback(event.target.result)
    reader.readAsDataURL(this.input.files[0])
  }

  render() {
    const { image_url, img_props, ...options } = this.props
    return (
      <ImageUploadFileWrapper>
        <input
          {...options}
          ref={ref => this.input = ref}
          type="file"
          onChange={this.onChangeImg}
          accept="image/*"
        />
        <img {...img_props} src={this.state.image_url} />
      </ImageUploadFileWrapper>
    )
  }
}
export { ImageUploadFile }
