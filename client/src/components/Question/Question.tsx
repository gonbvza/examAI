import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Question.module.css'
import { faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate } from 'react-router-dom';

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
  const [answerVisibility, setAnswerVisibility] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const { questionId } = useParams<{ questionId: string }>();

  const navigate = useNavigate()

  useEffect(() => {

    let isMounted = true;

    const fetchSummaryData = async () => {
      if (!questionId) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8000/questions/${questionId}`, {
          credentials: "include",
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        if(response.status == 404) {
          console.log("it is")
          navigate("/404")
        }

        const data = await response.json();
        
        if (isMounted) {
          console.log("Fetched data:", data);
          setQuestionMock(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        if(error == "Error: HTTP error! Status: 404") {
          navigate("/401")
        }
        if (isMounted) {
          
          setError('Failed to load summary. Please try again later.');
          setIsLoading(false);
        }
      }
    };

    fetchSummaryData();

    return () => {
      isMounted = false;
    };
  }, [questionId]);
  
  const changeAnswersVisibility = (id: string) => {
    return () => {
      setVisibleAnswers((prevState) => ({
        ...prevState,
        [id]: !prevState[id]
      }));
    };
  };
  
  const showAnswers = () => {
    setAnswerVisibility(!answerVisibility);
  };
  
  const checkAnswer = (questionIndex: number, option: string) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionIndex]: option
    }));
  };
  
  const getAnswerBackgroundColor = (questionIndex: number, option: string, correctAnswer: string) => {
    if (answerVisibility && option === correctAnswer) {
      return '#A4EF88'; 
    }
    
    if (selectedAnswers[questionIndex] === option) {
      return option === correctAnswer ? '#A4EF88' : '#FFB6B6'; 
    }
    
    return '#F3F2EE'; 
  };
  
  if (isLoading) {
    return <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>Loading summary...</p>
    </div>;
  }

  if (error) {
    return <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>!</div>
      <h2>Something went wrong</h2>
      <p>{error}</p>
    </div>;
  }

  if (!questionMock) {
    return <div className={styles.notFoundContainer}>
      <h2>Summary not found</h2>
      <p>The summary you&apos;re looking for doesn&apos;t exist or has been removed.</p>
    </div>;
  }

  return (
    <>
      <div className={styles.questionPageContainer}>
        <h1>{questionMock ? questionMock.name : "Loading..."} Exam</h1>
        <div className={styles.promptContainers}>
          {questionMock?.questions?.map((question, index) => {
            const isVisible = visibleAnswers[String(index)];
            return (
              <div key={index}>
                <div 
                  className={styles.prompt} 
                  onClick={changeAnswersVisibility(String(index))}
                >
                  <h3>Question {index + 1}: {question.questionText}</h3>
                  <button 
                    className={styles.answersButton} 
                    onClick={(e) => {
                      e.stopPropagation();
                      changeAnswersVisibility(String(index))();
                    }}
                  >
                    {isVisible ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                  </button>
                </div>
                <ul
                  id={String(index)}
                  className={isVisible ? styles.visible : styles.hidden}
                >
                  {['A', 'B', 'C', 'D'].map(option => (
                    <li 
                      key={option}
                      id={option} 
                      style={{ 
                        backgroundColor: getAnswerBackgroundColor(index, option, question.correct),
                        cursor: 'pointer'
                      }}
                      onClick={() => checkAnswer(index, option)}
                    >
                      {option}: {question[option as keyof typeof question]}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <button 
          style={{ display: questionMock ? 'block' : 'none'}} 
          onClick={showAnswers} 
          className={styles.submitButton}
        >
          Display results
        </button>
      </div>
    </>
  );
};

export default Question;