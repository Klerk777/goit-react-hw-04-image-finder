import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.scss';

export default function ImageGallery({ pictures, onImageClick }) {
  return (
    <ul className={styles.gallery}>
      {pictures.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          smallImg={webformatURL}
          largeImg={largeImageURL}
          tags={tags}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ).isRequired,
  onImageClick: PropTypes.func,
};
