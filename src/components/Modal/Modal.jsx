import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    console.log('e :>> ', e);
    console.log('key code', e.code);

    if (e.code === 'Escape') {
      this.props.onClose();
    }

    if (e.code === 'ArrowLeft') {
      this.props.onPrevImg();
    }

    if (e.code === 'ArrowRight') {
      this.props.onNextImg();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={styles.overlay} onClick={this.handleBackdropClick}>
        <div className={styles.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onNextImg: PropTypes.func,
};
