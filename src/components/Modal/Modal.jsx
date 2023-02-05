import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown); //unregistering listener when component unmount
    //TODO: clear App.state.largeImageURL when modal unmount
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('ESC pressed. Need to close modal.');
      this.props.onClose();
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
