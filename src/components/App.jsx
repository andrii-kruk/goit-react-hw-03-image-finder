import React, { Component } from 'react';
import Notiflix from 'notiflix';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';

import { StyledContainer, StyledTitle } from './App.styled';
import { getImages, PER_PAGE } from 'services/api';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    search: '',
    page: 1,
    totalPages: 1,
    images: [],
    modal: { isOpen: false, img: null },
    status: STATUS.IDLE,
  };

  async componentDidUpdate(_, prevState) {
    const { search, page, images, totalPages } = this.state;

    if (prevState.images.length < images.length && page !== 1) {
      const scrollOptions = {
        top: 630,
        behavior: 'smooth',
      };
      window.scrollBy(scrollOptions);
    }

    if (prevState.search !== search && search !== '') {
      try {
        this.setState({ status: STATUS.PENDING });

        const { hits, totalHits } = await getImages(search, page);
        this.setState({
          images: hits,
          totalPages: Math.ceil(totalHits / PER_PAGE),
          status: STATUS.RESOLVED,
        });
      } catch (error) {
        this.setState({ status: STATUS.REJECTED });
      }
      return;
    }

    if (prevState.page !== page && page !== 1) {
      try {
        this.setState({ status: STATUS.PENDING });

        const { hits } = await getImages(search, page);
        this.setState({
          images: [...prevState.images, ...hits],
          status: STATUS.RESOLVED,
        });

        if (page === totalPages)
          return Notiflix.Notify.warning('This is last page!');
      } catch (error) {
        this.setState({ status: STATUS.REJECTED });
      }
    }
  }

  handleSubmit = search => {
    if (search === '') {
      return Notiflix.Notify.warning('Please enter something.');
    }
    if (search === this.state.search) {
      return Notiflix.Notify.warning('You entered the same query!');
    }

    this.setState({
      search,
      page: 1,
      totalPages: 1,
    });
  };
  openModal = selectedImage => {
    this.setState({
      modal: { isOpen: true, img: selectedImage },
    });
  };

  closeModal = () => {
    this.setState({
      modal: { isOpen: false, img: null },
    });
  };

  onLoadMore = () => {
    const { page, totalPages } = this.state;

    if (page !== totalPages) {
      this.setState(prevState => ({
        page: prevState.page + 1,
        status: STATUS.PENDING,
      }));
    }
  };

  render() {
    const { status, images, modal, page, totalPages } = this.state;

    return (
      <StyledContainer>
        <Searchbar handleSubmit={this.handleSubmit} />

        {status === STATUS.IDLE && (
          <StyledTitle>Look for something...</StyledTitle>
        )}

        {status === STATUS.PENDING && <Loader />}

        {status === STATUS.REJECTED ||
          (totalPages === 0 && (
            <StyledTitle>Sorry! Something went wrong!</StyledTitle>
          ))}

        {images.length !== 0 && (
          <>
            <ImageGallery images={images} openModal={this.openModal} />
            {totalPages !== page && totalPages !== 0 && (
              <Button children={'Load more'} loadMore={this.onLoadMore} />
            )}
          </>
        )}

        {modal.isOpen && (
          <Modal content={modal.img} onClose={this.closeModal} />
        )}
      </StyledContainer>
    );
  }
}

export default App;
