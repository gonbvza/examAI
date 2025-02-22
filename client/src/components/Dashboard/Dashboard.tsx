import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

interface Row {
  id: string;
  name: string;
  created_at: string; // Use string instead of Date
}

interface Rows {
  questions: Row[];
  summaries: Row[];
}

const Dashboard = () => {
  const [rows, setRows] = useState<Rows | null>(null);
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
    async function getSummaries() {
      try {
        const response = await fetch("http://localhost:8000/summary/", {
          credentials: "include", // Sends sessionid cookie
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        setRows(data); // Update rows state
      } catch (error) {
        console.error("Error fetching summaries:", error);
      }
    }

    getSummaries();
  }, []);

  // Log updated rows after they are set
  useEffect(() => {
    if (rows) {
      console.log("Rows updated: ", rows);
    }
  }, [rows]);

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

export default Dashboard;
