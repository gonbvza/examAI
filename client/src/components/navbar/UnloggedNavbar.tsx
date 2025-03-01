import React from 'react';

import {Link} from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {

  return (
    <div className={styles.App}>
      <div className="App-header">
        <nav className={`${styles.navbar}`}>

          <h1 className={styles.logo}><Link to="/landing">examAI</Link></h1>
          <ul className={styles.navMenu}>
            <div className={styles.links}>
              <li><Link to="/signUp">Sign up</Link></li>
              <li className={styles.logIn}><Link to="/logIn">Log in</Link></li>
            </div>
          </ul>
        </nav>
      </div>
      <div className={styles.line}></div>
    </div>
    
  );
}

export default Navbar
