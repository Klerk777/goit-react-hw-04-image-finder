import React from 'react';
import PropTypes from 'prop-types';
import styles from './LargeImage.module.scss';

export default function LargeImage({ largeImageURL, tags }) {
  return (
    <>
      <img className={styles.largeImg} src={largeImageURL} alt={tags} />
      <p className={styles.imgTags}>{tags}</p>
    </>
  );
}

LargeImage.propTypes = {
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};
