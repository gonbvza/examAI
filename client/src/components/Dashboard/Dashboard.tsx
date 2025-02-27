import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

import { capitalizeFirstLetter } from '../../helpers/capitalize';

interface Row {
  id: string;
  name: string;
  type: string;
  pub_date: string; // Use string instead of Date
}

interface Rows {
  rows: Row[];
}

const Dashboard = () => {
  const [rows, setRows] = useState<Rows | null>(null);
  const navigate = useNavigate();

  // 0 is for summary, 1 is for question
  const sendToWindow = (type: string, id: string) => {
    if (type === "summary") {
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
        <div style={{display: (rows?.rows.length == 0) ? 'inline': 'none'}} className={styles.noExams}>
          <p>Currently you have no exams</p>
        </div>
        <div className={styles.rowsDisplay}>
          {rows?.rows.map((row) => (
            <div key={row.id} className={styles.row}>
              <div className={styles.rowBody}>
                <h3>{capitalizeFirstLetter(row.name)}  {capitalizeFirstLetter(row.type)}</h3>
                <div className={styles.rowCharacteristics}>
                  <p>Created on: {new Date(row.pub_date).toLocaleDateString()}</p>
                </div>
              </div>
              <button className={styles.viewButton} onClick={() => sendToWindow(row.type, row.id)}>View</button>
            </div>
          ))}

          {rows?.rows.map((question) => (
            <div key={question.id} className={styles.row}>
              <div className={styles.rowBody}>
                <h3>{capitalizeFirstLetter(question.name)} {capitalizeFirstLetter(question.type)}</h3>
                <div className={styles.rowCharacteristics}>
                  <p>Created on: {new Date(question.pub_date).toLocaleDateString()}</p>
                </div>
              </div>
              <button className={styles.viewButton} onClick={() => sendToWindow(question.type, question.id)}>View</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
