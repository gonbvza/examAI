import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css'
import Navbar from '../navbar/Navbar'
import Footer from '../Footer/Footer'

interface rows {
  summaries: {
    id: string;
    name: string;
    type: string;
    created_at: Date;
  }[];
  questions: {
    id: string;
    name: string;
    type: string;
    created_at: Date;
  }[];
}

const Dashboard = () => {
  const [rows, setRows] = useState<rows | null>(null);  
  const navigate = useNavigate();

  // 0 is for summary, 1 is for question
  const sendToWindow = (type: number, id: string) => {
    if (type === 0) {
      navigate(`/summary/${id}`); // Route for summaries
    } else {
      navigate(`/question/${id}`); // Route for questions
    }
  };

  useEffect(() => {
    fetch('/public/rowDummy.json') 
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRows(data);
      })
      .catch((error) => console.error('Error loading JSON:', error));
  }, []);

  return (
    <>
      <div className={styles.dashboardContainer}>
        <h1>Dashboard</h1>
        <p>Please select your exam</p>
        <div className={styles.rowsDisplay}>
          {rows?.summaries.map((summary) => (
            <div key={summary.id} className={styles.row}>
              <div className={styles.rowBody}>
                <h3>{summary.name}</h3>
                <div className={styles.rowCharacteristics}>
                  <p>Created on: {new Date(summary.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <button className={styles.viewButton} onClick={() => sendToWindow(0, summary.id)}>View</button>
            </div>
          ))}

          {rows?.questions.map((question) => (
            <div key={question.id} className={styles.row}>
              <div className={styles.rowBody}>
                <h3>{question.name}</h3>
                <div className={styles.rowCharacteristics}>
                  <p>Created on: {new Date(question.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <button className={styles.viewButton} onClick={() => sendToWindow(1, question.id)}>View</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard