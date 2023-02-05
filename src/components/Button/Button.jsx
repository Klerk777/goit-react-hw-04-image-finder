import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

export default function Button({ loadMoreClick }) {
  return (
    <button className={styles.button} type="button" onClick={loadMoreClick}>
      Load more
    </button>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func,
};
