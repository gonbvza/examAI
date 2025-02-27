import { useEffect } from 'react';
import styles from './LandingBody.module.css';
import { faBullseye, faClock, faFileAlt, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { verifyLogIn } from '../../helpers/verifyUser';

const LandingBody = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await verifyLogIn();
        if (user.length > 0) {
          navigate("main/");
        }
      } catch (error) {
        console.error("Error verifying login:", error);
      }
    };
    
    getUser();
  }, [navigate]);

  return (
    <div className={styles.webContainer}>
      <div className={styles.bodyWeb}>
        <div className={styles.bodyTitle}>
          <img 
            src="/src/assets/im_1.jpg" 
            alt="Document transformation illustration" 
            loading="eager"
          />
          <div className={styles.mainHeader}>
            <h1>Transform Your Documents Instantly</h1>
            <p>Upload your text or PDF to summarize or create exams. Save time, improve efficiency, and focus on what matters most.</p>
            <Link to="/signUp">
              <button className={styles.getStarted}>
                Get Started
                <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '10px' }} />
              </button>
            </Link>
          </div>
        </div>
        
        <div className={styles.mainText}>
          <h2>Why choose ExamAI?</h2>
          <p>
            ExamAI provides the ultimate solution for document summarization and exam creation, 
            enhancing learning efficiency and saving valuable time. With advanced AI technology, 
            it delivers precise summaries and intelligently generated exams for a seamless learning experience.
          </p>
        </div>
        
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <FontAwesomeIcon icon={faBullseye} />
            <h3 className={styles.title}>AI-Powered Accuracy</h3>
            <p className={styles.description}>
              Our advanced AI algorithms ensure precise document analysis and high-quality exam generation
              tailored to your specific needs.
            </p>
          </div>
          
          <div className={styles.card}>
            <FontAwesomeIcon icon={faClock} />
            <h3 className={styles.title}>Time-Saving Automation</h3>
            <p className={styles.description}>
              Reduce hours of manual work to minutes. Our platform automates document processing
              and exam creation so you can focus on teaching and learning.
            </p>
          </div>
          
          <div className={styles.card}>
            <FontAwesomeIcon icon={faFileAlt} />
            <h3 className={styles.title}>Customizable Outputs</h3>
            <p className={styles.description}>
              Tailor summaries and exams to your specific requirements with customizable options
              for format, length, difficulty, and question types.
            </p>
          </div>
        </div>
        
        <div className={styles.navLinksContainer}>
          <h2>Ready to transform your workflow?</h2>
          <ul className={styles.navLinks}>
            <li>
              <Link to="/signUp">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingBody;