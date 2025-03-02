import { useState, useEffect, ComponentType } from 'react'
import styles from './Sign.module.css'
import { verifyLogIn } from '../../helpers/verifyUser.ts'
import { useNavigate } from 'react-router-dom'
import { verifyMail } from '../../helpers/verifyMail.ts'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import Modal from 'react-modal';

import { PasswordCheckService, getPasswordStrengthText} from '../../helpers/passwordCheck.ts'

import { HOST } from '../../config.ts'; 

const ErrorModalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        background: "#ff4d4d", 
        padding: "30px",
        borderRadius: "10px",
        color: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        animation: "shake 0.5s ease-in-out"
    },
};

interface NavbarProps {
    setUsernameNavBar: (username: string) => void;
}

declare type ComponentType = typeof import("react");

const ModalSafeForReact18 = Modal as ComponentType;

const Sign = ({setUsernameNavBar}: NavbarProps) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Username, setUsername] = useState("");

    const [NotValidMail, setNotValidMail] = useState(false);
    const [NotValidPassword, setNotValidPassword] = useState(false);
    const [uploadError, setUploadError] = useState(false)
    const [errorModalMessage, setErrorModalMessage] = useState("")

    const [passwordStrength, setPasswordStrength] = useState("")
    
    const passwordCheck = new PasswordCheckService()
    const navigate = useNavigate();

    async function sendLogin(e:any) {
        e.preventDefault(); 
        setNotValidPassword(false)
        if(!verifyMail(Email)) {
            setNotValidMail(true)
            return
        }
        
        if(passwordStrength !== "Strong") {
            setNotValidPassword(true)
            return
        } 
        
        setNotValidMail(false)  // Changed from true to false

        try {
            const response = await fetch(`${HOST}/user/signup/`, {
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

                if (data.error === "User already exists") {  // Using strict equality
                    setUploadError(true)
                    setErrorModalMessage("Username or email already taken")
                    return
                }
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
    }

    useEffect(() => {
        const getUser = async () => {
            const user:string = await verifyLogIn()
            setUsername(user)
        };
    
        getUser();

        if(Username.length > 0) {
            navigate("/main")
        }
    }, []);

    useEffect(() => {
        const strengthEnum = passwordCheck.checkPasswordStrength(Password);
        const strengthText = getPasswordStrengthText(strengthEnum)
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
                    <form onSubmit={sendLogin}>  {/* Added onSubmit here instead of onClick on button */}
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
                            Password  {/* Fixed typo */}
                            <input type="password" name="Password" value={Password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
                        </label>
                        <p style={{color: 'red', display: NotValidPassword ? 'inline': 'none'}}> Please provide a valid password</p>
                        {Password.length > 0 && (
                                <p className={`${styles.strengthIndicator} ${styles[passwordStrength.toLowerCase()]}`}>
                                    Password Strength: {passwordStrength}
                                </p>
                        )}
                        <button type="submit" className={styles.submitButton}>
                            Sign Up
                        </button>
                    </form>
                </div>
                <ModalSafeForReact18 isOpen={uploadError} style={ErrorModalStyle}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <button 
                            onClick={() => setUploadError(false)} 
                            style={{
                                background: "transparent", 
                                border: "none", 
                                fontSize: "20px", 
                                color: "white", 
                                position: "absolute", 
                                top: "10px", 
                                right: "15px",
                                cursor: "pointer"
                            }}
                        >
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                        <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
                            Sign up failed
                        </p>
                        <p>{errorModalMessage}</p>
                    </div>
                </ModalSafeForReact18>
            </div>
        </>
    )
}

export default Sign