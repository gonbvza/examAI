import {useState, useEffect} from 'react'
import styles from './Sign.module.css'
import { verifyLogIn } from '../../helpers/verifyUser.ts'
import { useNavigate } from 'react-router-dom'
import { verifyMail } from '../../helpers/verifyMail.tsx'

import { PasswordCheckService, getPasswordStrengthText} from '../../helpers/passwordCheck.ts'

const Sign = ({setUsernameNavBar} : {setUsernameNavBar: React.Dispatch<React.SetStateAction<string>>}) => {
    const [Email, setEmail] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const [Username, setUsername] = useState<string>("");

    const [NotValidMail, setNotValidMail] = useState(false);
    const [NotValidPassword, setNotValidPassword] = useState(false);

    const [passwordStrength, setPasswordStrength] = useState<string>("")
    
    const passwordCheck = new PasswordCheckService()
    const navigate = useNavigate();

    async function sendLogin(e: React.FormEvent) {
        e.preventDefault(); 
        setNotValidPassword
        if(!verifyMail(Email)) {
            setNotValidMail(true)
            return
        }
        
        if(passwordStrength != "Strong") {
            setNotValidPassword(true)
            return
        } 
        
        setNotValidMail(true)

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

    useEffect(() => {
        // Get the enum value (number)
        const strengthEnum = passwordCheck.checkPasswordStrength(Password);
        
        // Convert the enum value to its string representation
        const strengthText = getPasswordStrengthText(strengthEnum)
        
        // Set the text representation
        setPasswordStrength(strengthText);
        
        console.log("Password strength:", strengthText);
    }, [Password]);
    
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
                    <p style={{color: 'red', display: NotValidMail ? 'inline': 'none'}}> Please provide a valid mail</p>
                    <label className={styles.emailInput}>
                        Pasword
                        <input type="password" name="Password" value={Password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
                    </label>
                    <p style={{color: 'red', display: NotValidPassword ? 'inline': 'none'}}> Please provide a valid password</p>
                    {Password.length > 0 && (
                            <p className={`${styles.strengthIndicator} ${styles[passwordStrength.toLowerCase()]}`}>
                                Password Strength: {passwordStrength}
                            </p>
                    )}
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