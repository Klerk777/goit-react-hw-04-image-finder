import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.scss';

export default function ImageGalleryItem({ smallImg, tags }) {
  return (
    <li className={styles.galleryItem}>
      <img src={smallImg} alt={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {};
