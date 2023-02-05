import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.scss';

export default function ImageGallery({ pictures }) {
  return (
    <ul className={styles.gallery}>
      {pictures.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          smallImg={webformatURL}
          tags={tags}
          // largeImg={item.largeImageURL}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {};
