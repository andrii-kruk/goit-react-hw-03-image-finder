import React from 'react';
import { StyledImage, StyledItem } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ images, openModal }) => {
  return images.map(img => {
    return (
      <StyledItem
        className="ImageGalleryItem"
        key={img.id}
        onClick={() => openModal(img)}
      >
        <StyledImage
          src={img.webformatURL}
          alt={img.tags}
          className="ImageGalleryItem_image"
        />
      </StyledItem>
    );
  });
};

export default ImageGalleryItem;
