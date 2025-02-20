import React, { useState } from 'react';
import styles from './Main.module.css';
import { faFile} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';

import Navbar from '../navbar/Navbar';
import Footer from '../Footer/Footer';

import { useNavigate } from 'react-router-dom';

const summaryURL = "http://127.0.0.1:8000/summary/generateSummary/"

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

const Main = () => {
    const [file, setFile] = useState<File | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [loading, setloading] = useState(false)

    const navigate = useNavigate();

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
            setloading(true)
            if(file) {
                const formData = new FormData();
                formData.append("file", file); 

                try {
                    const response = await fetch(summaryURL, {
                      method: 'POST',
                      body: formData, // Use FormData to send the file
                      // No need to manually set 'Content-Type' when using FormData
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
            }
        }
    }

    return (
        <>
            <Navbar />
            <div className={styles.mainContainer}>
                <div className={styles.titleContainer}>
                    <h1>Welcome to examAI</h1>
                    <p>Upload a document or write some text, then let our AI summarize it or turn it into a multiple-choice exam.</p>
                </div>
                <div className={styles.uploadContainer}>
                    <textarea className={styles.textInput} id="textInput" name="textInput" rows={9} cols={45} placeholder='Paste your text here ...'/>
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
            </div>
            <Footer />
        </>
    );
};

export default Main;
