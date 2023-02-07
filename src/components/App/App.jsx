import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import fetchImagesOnQuery from '../../service/api';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import styles from './App.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import StartMessage from 'components/StartMessage/StartMessage';

export default class App extends Component {
  state = {
    query: '',
    page: 1,
    pictures: [],
    largeImageURL: '',
    isLoading: false,
    isVisible: false,
    error: null,
  };

  componentDidMount() {}

  async componentDidUpdate(pP, pS) {
    const { query, page } = this.state;
    let totalHits = 0;

    if (pS.query !== query || (pS.page !== page && query.length > 1))
      try {
        this.setState({ isLoading: true });
        const response = await fetchImagesOnQuery(query, page);

        if (response.total < 1) {
          toast.error('Unfortunately, nothing was found for your query', {
            icon: '😢',
          });
        }

        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...response.hits],
        }));
        totalHits = response.total;
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState(prevState => ({
          isLoading: false,
          isVisible: prevState.pictures.length < totalHits,
        }));
      }
  }

  handleFormSubmit = newQuery => {
    const { query } = this.state;

    if (newQuery.trim() === '') {
      toast('Pleas, enter some query', {
        icon: '❔',
      });
      return;
    } else {
      if (query !== newQuery) {
        this.setState({ query: newQuery, page: 1, pictures: [] });
      }
    }
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL });
  };

  handleModalClose = () => {
    this.setState({ largeImageURL: '' });
  };

  render() {
    const { pictures, largeImageURL, query, isVisible, isLoading } = this.state;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery
          pictures={pictures}
          onImageClick={this.handleImageClick}
        />
        {pictures.length === 0 && (
          <StartMessage message="Let's find some cool photos! Just typing your query for search!" />
        )}

        {pictures.length > 0 && isVisible && !isLoading && (
          <Button loadMoreClick={this.handleLoadMoreClick} />
        )}

        <ThreeDots
          height="100"
          width="100"
          radius="9"
          color="#4141bd"
          ariaLabel="three-dots-loading"
          wrapperStyle={{
            display: isLoading ? 'flex' : 'none',
            justifyContent: 'center',
          }}
          wrapperClassName=""
          visible={true}
        />

        {largeImageURL && (
          <Modal onClose={this.handleModalClose}>
            <img src={largeImageURL} alt={query} />
          </Modal>
        )}

        <ToastContainer theme="dark" autoClose="3500" />
      </div>
    );
  }
}
