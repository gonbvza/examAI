import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Question.module.css'
import { faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface QuestionData {
  id: number;
  name: string;
  questions: {
    questionText: string;
    A: string;
    B: string;
    C: string;
    D: string;
    correct: string;
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
    fetch(`http://127.0.0.1:8000/questions/${questionId}`) 
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
                  <li id='A' style={{ backgroundColor: answerVisibility && question.correct === 'A' ? '#A4EF88' : '#F3F2EE'}}>A: {question.A}</li>
                  <li id='B' style={{ backgroundColor: answerVisibility && question.correct === 'B' ? '#A4EF88' : '#F3F2EE' }}>B: {question.B}</li>
                  <li id='C' style={{ backgroundColor: answerVisibility && question.correct === 'C' ? '#A4EF88' : '#F3F2EE' }}>C: {question.C}</li>
                  <li id='D' style={{ backgroundColor: answerVisibility && question.correct === 'D' ? '#A4EF88' : '#F3F2EE' }}>D: {question.D}</li>
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
