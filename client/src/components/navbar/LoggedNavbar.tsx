import  React, {useState} from 'react'
import {Link} from 'react-router-dom'
import styles from './LoggedNavbar.module.css'
import { useNavigate } from 'react-router-dom'

import { logout } from '../../helpers/logout'

const LoggedNavbar = ({name, setUsernameNavbar}: {name: string, setUsernameNavbar: React.Dispatch<React.SetStateAction<string>>}) => {

  const navigate = useNavigate();

  const logOutLocal = async () => {
    const response = await logout();

    if(response) {
      navigate("landing/");
      setUsernameNavbar("")
    }

  }
  
  return (
    <div className={styles.App}>
      <div className="App-header">
        <nav className={`${styles.navbar}`}>

          <h1 className={styles.logo}>Hi, {name}</h1>
          <ul className={styles.navMenu}>
            <div className={styles.links}>
              <li onClick={logOutLocal}>log out</li>
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