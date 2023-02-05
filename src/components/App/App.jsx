import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import fetchImagesOnQuery from '../../service/api';
import ImageGallery from '../ImageGallery/ImageGallery';
import styles from './App.module.scss';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

export default class App extends Component {
  state = {
    query: '',
    page: 1,
    pictures: [],
    largeImageURL: '',
  };

  componentDidMount() {}

  async componentDidUpdate(pP, pS) {
    const { query, page } = this.state;
    const response = await fetchImagesOnQuery(query, page);
    console.log('response in componentDidUpdate >>', response);
    if (pS.query !== query || pS.page !== page)
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...response],
      }));
  }

  handleFormSubmit = query => {
    if (this.state.query !== query) {
      this.setState({ query, page: 1, pictures: [] });
    }
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL });
    console.log('this.largeImageURL', this.state.largeImageURL);
  };

  handleModalClose = () => {
    this.setState({ largeImageURL: '' });
  };

  render() {
    const { pictures, largeImageURL, query } = this.state;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          pictures={pictures}
          onImageClick={this.handleImageClick}
        />
        {/* TODO: logic for render button and spinner */}
        {pictures.length > 0 && (
          <Button loadMoreClick={this.handleLoadMoreClick} />
        )}
        {largeImageURL && (
          <Modal onClose={this.handleModalClose}>
            <img src={largeImageURL} alt={query} />
          </Modal>
        )}
      </div>
    );
  }
}
