import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.scss';

export default function ImageGalleryItem({
  smallImg,
  tags,
  onImageClick,
  largeImg,
}) {
  return (
    <li className={styles.galleryItem}>
      <img src={smallImg} alt={tags} onClick={() => onImageClick(largeImg)} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onImageClick: PropTypes.func,
  largeImg: PropTypes.string.isRequired,
};
