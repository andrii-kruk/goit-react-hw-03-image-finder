import React from 'react';
import { StyledImage, StyledItem } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ images, openModal }) => {
  return images.map(img => {
    return (
      <StyledItem key={img.id} onClick={() => openModal(img)}>
        <StyledImage src={img.webformatURL} alt={img.tags} loading="lazy" />
      </StyledItem>
    );
  });
};

export default ImageGalleryItem;
