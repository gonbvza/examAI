import {useState, useEffect} from 'react'
import styles from './Sign.module.css'
import Navbar from '../navbar/Navbar'
import Footer from '../Footer/Footer'

const Sign = () => {
    const [Email, setEmail] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const [Name, setName] = useState<string>("");
    const [Surname, setSurname] = useState<string>("");

    function sendLogin(e: React.FormEvent) {
        e.preventDefault(); // Prevents the default form submission behavior
        console.log("Login in");
        // You can handle the logic for user registration here, e.g. sending data to an API
        console.log({
          Email,
          Password,
          Name,
          Surname,
        });
      }

  return (
    <>
        <Navbar/>
        <div className={styles.signContainer}>
            <div className={styles.titleContainer}>
                <h1>Sign Up</h1>
                <p>Welcome! Create your account</p>
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
                    <div className={styles.nameInput}>
                        <label>
                            Name
                            <input type="text" name="Name" value={Name} placeholder='Name' onChange={(e) => setName(e.target.value)}></input>
                        </label>
                        <label>
                            Surname
                            <input type="text" name="Surname" value={Surname} placeholder='Surname' onChange={(e) => setSurname(e.target.value)}></input>
                        </label>
                    </div>
                    <button onClick={sendLogin} className={styles.submitButton}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Sign