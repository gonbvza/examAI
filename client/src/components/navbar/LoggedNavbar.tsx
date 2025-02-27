import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './LoggedNavbar.module.css'
import { logout } from '../../helpers/logout'
import { faUser, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoggedNavbar = ({name, setUsernameNavbar}: {name: string, setUsernameNavbar: React.Dispatch<React.SetStateAction<string>>}) => {
  const navigate = useNavigate();
  const [showUsername, setShowUsername] = useState(false);
  
  const logOutLocal = async () => {
    const response = await logout();
    if(response) {
      navigate("landing/");
      setUsernameNavbar("")
    }
  }
  
  const goToMain = () => {
    navigate("/main");
  }
  
  return (
    <div className={styles.App}>
      <div className="App-header">
        <nav className={`${styles.navbar}`}>
          <div className={styles.navBarTitle} onClick={goToMain}>
            <FontAwesomeIcon icon={faStar}/>
            <h1 className={styles.logo}>examAI</h1>
          </div>
          <ul className={styles.navMenu}>
            <div className={styles.links}>
              
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li className={styles.logIn}><Link to="/main">New</Link></li>
              <div
                className={styles.userContainer}
                onMouseEnter={() => setShowUsername(true)}
                onMouseLeave={() => setShowUsername(false)}
              >
                <FontAwesomeIcon icon={faUser} className={styles.user}/>
                {showUsername && <div className={styles.usernameTooltip}>{name} <li onClick={logOutLocal} className={styles.logOutButton}>log out</li></div>}
              </div>
            </div>
          </ul>
        </nav>
      </div>
      <div className={styles.line}></div>
    </div>
  );
}

export default LoggedNavbar