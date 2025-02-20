import React, { useState, useEffect} from 'react'
import styles from './LogIn.module.css'
import { useNavigate } from 'react-router-dom'
import { verifyLogIn } from '../../helpers/verifyUser'

const LogIn = ({setUsernameNavBar}:{setUsernameNavBar: React.Dispatch<React.SetStateAction<string>>}) => {
    const [username, setUsername] = useState<string>("");
    const [Password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    async function sendLogin(e: React.FormEvent) {
        e.preventDefault(); 
        try {
            const response = await fetch("http://localhost:8000/user/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "username": username, "password" : Password}),
                credentials: "include"
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log("Login successful!", data);
                setUsernameNavBar(username)
                navigate("/main")
            } else {
                console.error("Login failed:", data.error);
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

        if(username.length > 0) {
            navigate("/main")
        }

    }, []);

  return (
    <>
        <div className={styles.signContainer}>
            <div className={styles.titleContainer}>
                <h1>Log in</h1>
                <p>Welcome back! Please log in into your account</p>
            </div>

            <div className={styles.inputForm}>
                <form>
                    <label className={styles.emailInput}>
                        username
                        <input type="text" name="username" value={username} placeholder='username' onChange={(e) => setUsername(e.target.value)}></input>
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
    </>
  )
}

export default LogIn