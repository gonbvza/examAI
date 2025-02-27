import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Cookies  from 'js-cookie';

import styles from './Summary.module.css';

interface SummaryData {
  name: string;
  summary: string[]
}

const Summary = () => {
  const [summaryMock, setSummaryMock] = useState<SummaryData | null>(null);

  const { summaryId } = useParams<{ summaryId: string }>();

  const csrftoken: string | undefined = Cookies?.get('csrftoken') || '';

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/summary/${summaryId}`, {credentials: "include",  headers: {'X-CSRFToken': csrftoken},}) 

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
    
      const getData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/summary/${summaryId}`, {
            credentials: "include", // Sends sessionid cookie
            headers: {'X-CSRFToken': csrftoken},
          })
        } catch (error) {
          console.log(error)
        }
      }

      getData()
  }, []);

  

  return (
    <>
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
    </>
  );
};

export default Summary;
