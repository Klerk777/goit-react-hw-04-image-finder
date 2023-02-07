import React from 'react';
import PropTypes from 'prop-types';
import styles from './StartMessage.module.scss';

export default function StartMesage({ message }) {
  return <div className={styles.message}>{message}</div>;
}

StartMesage.propTypes = {
  message: PropTypes.string.isRequired,
};
