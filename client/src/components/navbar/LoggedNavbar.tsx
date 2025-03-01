import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './LoggedNavbar.module.css'
import { logout } from '../../helpers/logout'
import { faUser, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

interface NavbarProps {
  name: string;
  setUsernameNavbar: (username: string) => void;
}


const LoggedNavbar = ({name, setUsernameNavbar}: NavbarProps) => {
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
  
   const userUnHover = async () => {
    console.log("unhovered")
    await sleep(1000)
    setShowUsername(false)
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
                onMouseLeave={() => userUnHover()}
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
