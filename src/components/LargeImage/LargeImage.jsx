import React from 'react';
import PropTypes from 'prop-types';
import styles from './LargeImage.module.scss';

export default function LargeImage({
  largeImageURL,
  tags,
  onPrevImg,
  onNextImg,
}) {
  return (
    <div className={styles.largeImgBox}>
      <span
        className={`${styles.arrow} ${styles.back}`}
        onClick={onPrevImg}
      ></span>
      <span
        className={`${styles.arrow} ${styles.forward}`}
        onClick={onNextImg}
      ></span>
      <img className={styles.largeImg} src={largeImageURL} alt={tags} />
      <p className={styles.imgTags}>{tags}</p>
    </div>
  );
}

LargeImage.propTypes = {
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};
