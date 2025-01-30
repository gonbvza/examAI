import React from 'react'
import styles from './LandingBody.module.css'
import { faBullseye, faClock, faFile} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom';


const LandingBody = () => {
  return (
    <>
        <div className={styles.webContainer}>
            <div className={styles.bodyWeb}>
                <div className={styles.bodyTitle}>
                    <img src="/src/assets/im_1.jpg" alt="image" />
                    <div className={styles.mainHeader}>
                        <h1>Transform Your Documents <br/> Instantly</h1>
                        <p>Upload your text or PDF to summarize or create exams. Save time, improve efficiency, and focus on what matters most.</p>
                    </div>
                </div>

                <div className={styles.mainText}>
                    <h2>Why choose exam AI?</h2>
                    <p>ExamAI provides the ultimate solution for document summarization and exam creation, enhancing learning efficiency and saving time. With advanced AI, it delivers precise summaries and intelligently generated exams for a seamless experience.</p>
                </div>

                <div className={styles.cardContainer}>
                    <div className={styles.card}>
                        <FontAwesomeIcon icon={faBullseye} />
                        <h3 className={styles.title}>AI-Powered Accuracy</h3>
                        <p className={styles.description}>Leverage advanced AI to ensure precise results.</p>
                    </div>

                    <div className={styles.card}>
                        <FontAwesomeIcon icon={faClock} />
                        <h3 className={styles.title}>Time-Saving Automation</h3>
                        <p className={styles.description}>Spend less time on manual tasks.</p>
                    </div>

                    <div className={styles.card}>
                        <FontAwesomeIcon icon={faFile} />
                        <h3 className={styles.title}>Customizable Outputs</h3>
                        <p className={styles.description}>Tailor outputs to your needs.</p>
                    </div>
                </div>

                <div className={styles.navLinksContainer}>
                    <h2>Try it out today!</h2>
                    <div>
                        <ul className={styles.navLinks}>
                            <li><Link to="/signUp">Sign Up</Link></li>
                            <li>Log In</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default LandingBody