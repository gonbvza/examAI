import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './Question.module.css'
import { faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface QuestionData {
  id: number;
  name: string;
  type: string;
  questions: {
    questionText: string;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    Correct: string;
  }[];
  created_at: string;
}

const Question = () => {
  const [questionMock, setQuestionMock] = useState<QuestionData | null>(null);
  const [visibleAnswers, setVisibleAnswers] = useState<{ [key: string]: boolean }>({});
  const [answerVisibility, setAnswerVisibility] = useState<boolean>(false)

  const { questionId } = useParams<{ questionId: string }>();
  console.log(questionId);

  useEffect(() => {
    fetch('/public/questionMock.json') 
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {

        setQuestionMock(data);
      })
      .catch((error) => console.error('Error loading JSON:', error));
  }, []);

  const changeAnswersVisibility = (id: string) => {
    setVisibleAnswers((prevState) => ({
      ...prevState,
      [id]: !prevState[id] 
    }));
  };

  const showAnswers = () => {
    setAnswerVisibility(!answerVisibility)
  }

  return (
    <>
      <div className={styles.questionPageContainer}>
        <h1>Exam {questionMock ? questionMock.name : "Loading..."}</h1>
        <div className={styles.promptContainers}>
          {questionMock?.questions?.map((question, index) => {
            const isVisible = visibleAnswers[String(index)];

            return (
              <div key={index}>
                <div className={styles.prompt}>
                  <h3>Question {index + 1}: {question.questionText}</h3>
                  <button onClick={() => changeAnswersVisibility(String(index))}>
                  {isVisible ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                    
                  </button>
                </div>
                <ul
                  id={String(index)}
                  className={isVisible ? styles.visible : styles.hidden} 
                >
                  <li id='A' style={{ backgroundColor: answerVisibility && question.Correct === 'A' ? '#A4EF88' : '#F3F2EE'}}>A: {question.answerA}</li>
                  <li id='B' style={{ backgroundColor: answerVisibility && question.Correct === 'B' ? '#A4EF88' : '#F3F2EE' }}>B: {question.answerB}</li>
                  <li id='C' style={{ backgroundColor: answerVisibility && question.Correct === 'C' ? '#A4EF88' : '#F3F2EE' }}>C: {question.answerC}</li>
                  <li id='D' style={{ backgroundColor: answerVisibility && question.Correct === 'D' ? '#A4EF88' : '#F3F2EE' }}>D: {question.answerD}</li>
                </ul>
              </div>
            );
          })}
        </div>
        <button style={{ display: questionMock ? 'block' : 'none'}} onClick={() => showAnswers()} className={styles.submitButton}>
          Display results
        </button>
      </div>
    </>
  );
};

export default Question;
