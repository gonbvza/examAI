import { useState} from 'react'
import styles from './LogIn.module.css'
import Navbar from '../navbar/Navbar';
import Footer from '../Footer/Footer';

const LogIn = () => {
    const [Email, setEmail] = useState<string>("");
    const [Password, setPassword] = useState<string>("");

    function sendLogin(e: React.FormEvent) {
        e.preventDefault(); // Prevents the default form submission behavior
        console.log("Login in");
        // You can handle the logic for user registration here, e.g. sending data to an API
        console.log({
          Email,
          Password,
        });
      }

  return (
    <>
        <Navbar/>
        <div className={styles.signContainer}>
            <div className={styles.titleContainer}>
                <h1>Log in</h1>
                <p>Welcome back! Please log in into your account</p>
            </div>

            <div className={styles.inputForm}>
                <form>
                    <label className={styles.emailInput}>
                        Email
                        <input type="text" name="Email" value={Email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
                    </label>
                    <label className={styles.emailInput}>
                        Pasword
                        <input type="password" name="Password" value={Password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
                    </label>
                    <button onClick={sendLogin} className={styles.submitButton}>
                        Log In
                    </button>
                </form>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default LogIn