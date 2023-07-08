import React, { Component } from 'react';

import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { StyledList } from './ImageGallery.styled';

class ImageGallery extends Component {
  render() {
    return (
      <StyledList>
        <ImageGalleryItem
          images={this.props.images}
          openModal={this.props.openModal}
        />
      </StyledList>
    );
  }
}

export default ImageGallery;
