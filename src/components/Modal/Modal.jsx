import React, { Component } from 'react';
import { StyledModal, StyledOverlay } from './Modal.styled';

class Modal extends Component {
  componentDidMount(prevProps) {
    if (prevProps !== this.props)
      return window.addEventListener('keydown', this.onEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscape);
  }

  onEscape = e => {
    if (e.code === 'Escape') return this.props.onClose();
  };

  closeModal = ({ target, currentTarget }) => {
    if (target === currentTarget) return this.props.onClose();
  };
  render() {
    const { content } = this.props;
    return (
      <StyledOverlay onClick={this.closeModal}>
        <StyledModal>
          <img src={content.largeImageURL} alt={content.tags} />
        </StyledModal>
      </StyledOverlay>
    );
  }
}

export default Modal;
