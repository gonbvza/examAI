import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer/Footer';

import styles from './Summary.module.css';

interface SummaryData {
  name: string;
  summary: string[]
}

const Summary = () => {
  const [summaryMock, setSummaryMock] = useState<SummaryData | null>(null);

  const { summaryId } = useParams<{ summaryId: string }>();

  useEffect(() => {
    fetch('/summaryMock.json') // No 'public/' in path
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setSummaryMock(data);
      })
      .catch((error) => console.error('Error loading JSON:', error));
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.summaryPageContainer}>
        <h1>{summaryMock ? summaryMock.name : 'Loading...'}</h1>
        <div className={styles.summaryContainer}>
            {summaryMock?.summary.map((item, index) => (
                <div>
                    <p key={index}>{item}</p>
                    <br />
                </div>

            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Summary;
