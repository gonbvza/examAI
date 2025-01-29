import  {useState} from 'react'
import styles from './Navbar.module.css'

const Navbar = () => {
  // adding the states 
  const [isActive, setIsActive] = useState(false);
  //add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };
  //clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false)
  }
  return (
    <div className={styles.App}>
      <div className="App-header">
        <nav className={`${styles.navbar}`}>
          {/* logo */}
          <h1 className={styles.logo}>examAI</h1>
          <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
            <div className={styles.links}>
              <li>Sign up</li>
              <li className={styles.logIn}>Log in</li>
            </div>
          </ul>
        </nav>
      </div>
      <div className={styles.line}></div>
    </div>
    
  );
}

export default Navbar