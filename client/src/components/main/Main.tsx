import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';
import { faFile} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';

import { verifyLogIn } from '../../helpers/verifyUser';

import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';

const summaryURLFile = "http://localhost:8000/summary/generateSummary/file"
const summaryURLText = "http://localhost:8000/summary/generateSummary/text"

const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
    },
  };

  const ErrorModalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        background: "#ff4d4d",  // Softer red
        padding: "20px",
        borderRadius: "10px",
        color: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        animation: "shake 0.5s ease-in-out"
    },
};


const Main = () => {
    const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [loading, setloading] = useState(false)
    const [uploadError, setUploadError] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async  () => {
            var user = await verifyLogIn();

            if(user == "") {
                navigate("/landing")
            }
        }

        getUser()
    }, []) 

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            let selectedFile = e.target.files[0];
            let originalName = selectedFile.name;
            let nameWithoutExtension = originalName.substring(0, originalName.lastIndexOf(".")); 
            
            let words = nameWithoutExtension.split(" ").filter(word => word.length > 0); 
    
            let newName = originalName; 
    
            if (words.length > 3) {
                newName = words.slice(0, 3).join(" ") + "..."; 
                console.log("Renamed file:", newName);
            } else {
                console.log("File name is short enough:", originalName);
            }

            const renamedFile = new File([selectedFile], newName, { type: selectedFile.type });

            setFile(renamedFile); 
        }
    };
    
    
    
    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    async function sendFile() {
        if(selectedOption == "summarize") {
            if(file) {
                const formData = new FormData();
                formData.append("file", file);
                console.log("sending file")
                try {
                    setloading(true)
                    const response = await fetch(summaryURLFile, {
                      method: 'POST',
                      body: formData,
                      headers: {'X-CSRFToken': Cookies.get('csrftoken')},
                      credentials: 'include', 
                    });
                
                    if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                
                    const data = await response.json();
                    console.log(data); // Handle the response from the server
                    
                    setloading(false)
                    navigate(`/summary/${data.summaryID}`)
                  } catch (error) {
                    console.error("Error during file upload:", error);
                }
            } else if(text) {

                if(name == "") {
                    console.log("Please insert a name")
                    return
                }

                setloading(true)
                try {
                    console.log("sending text")
                    const response = await fetch(summaryURLText, {
                      method: 'POST',
                      headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Content-Type': "application/json"},
                      body: JSON.stringify({"name": name, "text": text}),
                      credentials: 'include', 
                    });
                
                    if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                
                    const data = await response.json();
                    console.log(data); // Handle the response from the server
                    
                    setloading(false)
                    navigate(`/summary/${data.summaryID}`)
                  } catch (error) {
                    console.error("Error during file upload:", error);
                    setloading(false)
                    setUploadError(true)
                }
            }
        }
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.titleContainer}>
                    <h1>Welcome to examAI</h1>
                    <p>Upload a document or write some text, then let our AI summarize it or turn it into a multiple-choice exam.</p>
                </div>
                <div className={styles.uploadContainer}>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} className={styles.nameTextInput} placeholder='Name...'></input>
                    <textarea className={styles.textInput} value={text} onChange={(e) => setText(e.target.value)} id="textInput" name="textInput" rows={9} cols={45} placeholder='Paste your text here ...'/>
                    <input className={styles.fileInput} id="fileUpload" type="file" accept="application/pdf" onChange={handleFileChange} />
                    <label htmlFor="fileUpload" className={styles.uploadButton}>
                        <FontAwesomeIcon icon={faFile}/><i></i> {(file && file.name) || "Or upload a PDF"} 
                    </label>
                </div>
                <div className={styles.selectionContainer}>
                    <div className={styles.selectionHeader}>
                        <h2>I want to ...</h2>
                    </div>
                    <div className={styles.radioContainer}>
                        <label className={styles.radioLabel}>
                            <input 
                                type="radio" 
                                name="option" 
                                value="summarize"
                                className={styles.inputRadio}
                                checked={selectedOption === "summarize"}
                                onChange={() => handleOptionChange("summarize")}
                            /> Summarize this document
                        </label>
                        <label className={styles.radioLabel}>
                            <input 
                                type="radio" 
                                name="option" 
                                value="generateExam"
                                className={styles.inputRadio}
                                checked={selectedOption === "generateExam"}
                                onChange={() => handleOptionChange("generateExam")}
                            /> Create a multiple-choice exam from this document
                        </label>
                    </div>
                </div>
                <div className={styles.submitButtonContainer}>
                    <button onClick={sendFile} className={styles.submitButton}>
                        Submit
                    </button>
                </div>
                <Modal 
                    isOpen={loading}
                    style={customModalStyles}    
                >
                    <>
                        <img src="/src/assets/loading.gif" width="100" height="100"/>
                    </>
                </Modal>
                <Modal isOpen={uploadError} style={ErrorModalStyle}>
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
                            Upload Failed!
                        </p>
                        <p>Please try again or check your file format.</p>
                    </div>
                </Modal>

            </div>
        </>
    );
};

export default Main;
