import React from 'react';

import { useNavigate } from 'react-router-dom';
import styles from './NotAccesible.module.css';

const NotAccesible = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/main');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorIcon}>!</div>
        <h2 className={styles.title}>Not Accesible</h2>
        <p className={styles.description}>
          Oops! You don&apos;t have permission to access this site.
        </p>
        <button className={styles.button} onClick={handleGoHome}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NotAccesible;