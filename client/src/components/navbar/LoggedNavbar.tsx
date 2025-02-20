import  {useState} from 'react'
import {Link} from 'react-router-dom'
import styles from './LoggedNavbar.module.css'

const LoggedNavbar = ({name}: {name: string}) => {

  return (
    <div className={styles.App}>
      <div className="App-header">
        <nav className={`${styles.navbar}`}>

          <h1 className={styles.logo}>Hi, {name}</h1>
          <ul className={styles.navMenu}>
            <div className={styles.links}>
              <li><Link to="/dashboad">Dashboard</Link></li>
              <li className={styles.logIn}><Link to="/main">New</Link></li>
            </div>
          </ul>
        </nav>
      </div>
      <div className={styles.line}></div>
    </div>
    
  );
}

export default LoggedNavbar