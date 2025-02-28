import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

import { capitalizeFirstLetter } from '../../helpers/capitalize';

interface Row {
  id: string;
  name: string;
  type: string;
  pub_date: string; 
}

interface Rows {
  rows: Row[];
}

const Dashboard = () => {
  const [rows, setRows] = useState<Rows | null>(null);

  const navigate = useNavigate();

  const sendToWindow = (type: string, id: string) => {
    if (type === "summary") {
      navigate(`/summary/${id}`); 
    } else {
      navigate(`/question/${id}`); 
    }
  };

  useEffect(() => {
    async function getSummaries() {
      try {
        const response = await fetch("http://localhost:8000/summary/", {
          credentials: "include", 
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setRows(data);

      } catch (error) {
        console.error("Error fetching summaries:", error);
      }
    }

    getSummaries();
  }, []);

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
        </div>
      </div>
    </>
  );
}

export default Dashboard;
