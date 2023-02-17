import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import fetchImagesOnQuery from '../../service/api';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import StartMessage from 'components/StartMessage/StartMessage';
import LargeImage from 'components/LargeImage/LargeImage';
import styles from './App.module.scss';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchPictures = async () => {
      try {
        setIsLoading(true);
        const response = await fetchImagesOnQuery(query, page);
        const imgArray = response.hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return { id, largeImageURL, webformatURL, tags };
          }
        );
        console.log('response :>> ', response);
        if (response.totalHits < 1) {
          toast.error('Unfortunately, nothing was found for your query', {
            icon: '😢',
          });
        }

        setTotalHits(response.totalHits);
        setPictures(prev => [...prev, ...imgArray]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPictures();
  }, [query, page]);

  const handleFormSubmit = newQuery => {
    if (newQuery.trim() === '') {
      toast('Pleas, enter some query', {
        icon: '❔',
      });
      return;
    } else {
      if (query !== newQuery) {
        setQuery(newQuery);
        setPage(1);
        setPictures([]);
      }
    }
  };

  const handleIncrementPage = () => {
    setPage(prev => prev + 1);
  };

  const handleImageClick = (largeImageURL, tags) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const handleSelectPrevImg = () => {
    const prevIndex =
      pictures.findIndex(pic => pic.largeImageURL === largeImageURL) - 1;
    if (prevIndex < 0) return;

    setLargeImageURL(pictures[prevIndex].largeImageURL);
    setTags(pictures[prevIndex].tags);
  };

  const handleSelectNextImg = () => {
    const nextIndex =
      pictures.findIndex(pic => pic.largeImageURL === largeImageURL) + 1;

    if (nextIndex < pictures.length) {
      setLargeImageURL(pictures[nextIndex].largeImageURL);
      setTags(pictures[nextIndex].tags);
    }
    if (nextIndex === pictures.length && nextIndex !== totalHits) {
      handleIncrementPage();
    }
  };

  const handleModalClose = () => {
    setLargeImageURL('');
    setTags('');
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery pictures={pictures} onImageClick={handleImageClick} />
      {pictures.length === 0 && (
        <StartMessage message="Let's find some cool photos! Just typing your query for search!" />
      )}

      {pictures.length > 0 && pictures.length < totalHits && !isLoading && (
        <Button loadMoreClick={handleIncrementPage} />
      )}
      {error && <h2>{error}</h2>}

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
        <Modal
          onClose={handleModalClose}
          onPrevImg={handleSelectPrevImg}
          onNextImg={handleSelectNextImg}
        >
          <LargeImage
            largeImageURL={largeImageURL}
            tags={tags}
            onPrevImg={handleSelectPrevImg}
            onNextImg={handleSelectNextImg}
          />
        </Modal>
      )}

      <ToastContainer theme="dark" autoClose="3500" />
    </div>
  );
}
