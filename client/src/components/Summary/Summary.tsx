import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Summary.module.css';

import { useNavigate } from 'react-router-dom';

// interface SummaryData {
//   name: string;
//   summary: string[];
// }

const Summary = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { summaryId } = useParams<{ summaryId: string }>();

  const navigate = useNavigate()

  useEffect(() => {

    let isMounted = true;

    const fetchSummaryData = async () => {
      if (!summaryId) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8000/summary/${summaryId}`, {
          credentials: "include",
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        if(response.status == 404) {
          console.log("it is")
          navigate("/404")
        }

        const data = await response.json();
        
        if (isMounted) {
          console.log("Fetched data:", data);
          setSummaryData(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        if(error == "Error: HTTP error! Status: 404") {
          navigate("/401")
        }
        if (isMounted) {
          
          setError('Failed to load summary. Please try again later.');
          setIsLoading(false);
        }
      }
    };

    fetchSummaryData();

    return () => {
      isMounted = false;
    };
  }, [summaryId]);

  if (isLoading) {
    return <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>Loading summary...</p>
    </div>;
  }

  if (error) {
    return <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>!</div>
      <h2>Something went wrong</h2>
      <p>{error}</p>
    </div>;
  }

  if (!summaryData) {
    return <div className={styles.notFoundContainer}>
      <h2>Summary not found</h2>
      <p>The summary you&apos;re looking for doesn&apos;t exist or has been removed.</p>
    </div>;
  }

  return (
    <div className={styles.summaryPageContainer}>
      <div className={styles.summaryContainer}>
        <h1 className={styles.summaryTitle}>{summaryData.name} Exam</h1>
        
        <div className={styles.summaryContent}>
          {summaryData.summary.map((item:any, index:number) => (
            <div key={index} className={styles.summaryItem}>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summary;