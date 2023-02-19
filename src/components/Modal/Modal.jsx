import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ onClose, onPrevImg, onNextImg, children }) {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }

    if (e.code === 'ArrowLeft') {
      onPrevImg();
    }

    if (e.code === 'ArrowRight') {
      onNextImg();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  console.log('render ');
  return createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onPrevImg: PropTypes.func,
  onNextImg: PropTypes.func,
};
