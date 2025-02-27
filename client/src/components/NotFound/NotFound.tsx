
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.description}>
          Oops! The page you are looking for doesn't exist or is temporarily unavailable.
        </p>
        <button className={styles.button} onClick={handleGoHome}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;