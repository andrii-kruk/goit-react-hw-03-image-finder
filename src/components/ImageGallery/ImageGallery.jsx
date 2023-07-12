import React, { Component } from 'react';

import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { StyledList } from './ImageGallery.styled';

class ImageGallery extends Component {
  render() {
    const { images, openModal } = this.props;
    return (
      <StyledList>
        <ImageGalleryItem images={images} openModal={openModal} />
      </StyledList>
    );
  }
}

export default ImageGallery;
