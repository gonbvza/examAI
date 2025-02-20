import {useState, useEffect} from 'react'
import styles from './Sign.module.css'
import { verifyLogIn } from '../../helpers/verifyUser.ts'
import { useNavigate } from 'react-router-dom'

const Sign = ({setUsernameNavBar} : {setUsernameNavBar: React.Dispatch<React.SetStateAction<string>>}) => {
    const [Email, setEmail] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const [Username, setUsername] = useState<string>("");

    const navigate = useNavigate();

    async function sendLogin(e: React.FormEvent) {
        e.preventDefault(); 
        try {
            const response = await fetch("http://localhost:8000/user/signup/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "username": Username, "password" : Password, "email": Email}),
                credentials: "include"
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log("Signup successful!", data);
                setUsernameNavBar(Username)
                navigate("/main")
            } else {
                console.error("Signup failed:", data.error);
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
      }

    useEffect(() => {
        const getUser = async () => {
        var user:string = await verifyLogIn()
        setUsername(user)
        };
    
        getUser();

        if(Username.length > 0) {
            navigate("/main")
        }

    }, []);
    
  return (
    <>
        <div className={styles.signContainer}>
            <div className={styles.titleContainer}>
                <h1>Sign Up</h1>
                <p>Welcome! Create your account</p>
            </div>

            <div className={styles.inputForm}>
                <form>
                    <label className={styles.emailInput}>
                        Username
                        <input type="text" name="Username" value={Username} placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
                    </label>
                    <label className={styles.emailInput}>
                        Email
                        <input type="text" name="Email" value={Email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
                    </label>
                    <label className={styles.emailInput}>
                        Pasword
                        <input type="password" name="Password" value={Password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
                    </label>
                    <button onClick={sendLogin} className={styles.submitButton}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Sign