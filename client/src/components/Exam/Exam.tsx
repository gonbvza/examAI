import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faCheckCircle,
  faTimesCircle,
  faDownload,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

interface question {
  question_text: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correct: string;
}

interface exam {
  name: string;
  date: string;
  words: number;
  language: string;
  formality: string;
  questions: question[];
}

const Exam = () => {
  const [exam, setExam] = useState<exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [visible_answers, set_visibility] = useState<Record<number, boolean>>(
    {},
  );
  const [selected_answers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [show_correct_answers, setShowCorrectAnswers] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch("/mocks/exam_mock.json");
        const data = await response.json();
        console.log(data);
        setExam(data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const change_visibility = (id: number) => {
    return () => {
      set_visibility((prev_state) => ({
        ...prev_state,
        [id]: !prev_state[id],
      }));
    };
  };

  const selectAnswer = (questionIndex: number, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const getOptionIcon = (
    option: string,
    correct: string,
    questionIndex: number,
  ) => {
    const selectedAnswer = selected_answers[questionIndex];
    const isSelected = selectedAnswer === option;
    const isCorrect = option === correct.toLowerCase();

    if (show_correct_answers) {
      if (isCorrect) {
        return (
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 mr-2"
          />
        );
      }
      return (
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="text-red-400 mr-2 opacity-60"
        />
      );
    }

    if (isSelected) {
      if (isCorrect) {
        return (
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 mr-2"
          />
        );
      } else {
        return (
          <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 mr-2" />
        );
      }
    }

    return (
      <div className="w-4 h-4 mr-2 border-2 border-gray-300 rounded-full"></div>
    );
  };

  const downloadPDF = () => {
    // TODO: Implement PDF download functionality
    console.log("Download PDF functionality to be implemented");
  };

  const toggleCorrectAnswers = () => {
    setShowCorrectAnswers(!show_correct_answers);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading exam...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <p className="text-lg text-gray-600">Failed to load exam.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl font-bold text-gray-900">{exam.name}</h1>

            <div className="flex gap-3">
              <button
                onClick={downloadPDF}
                className="cursor-pointer flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors duration-200 font-medium text-sm"
              >
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Download PDF
              </button>

              <button
                onClick={toggleCorrectAnswers}
                className={`cursor-pointer  flex items-center px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm ${
                  show_correct_answers
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                {show_correct_answers ? "Hide Answers" : "Show Answers"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 font-medium">Date</p>
              <p className="text-lg font-semibold text-gray-900">{exam.date}</p>
            </div>

            <div className="bg-indigo-50 rounded-lg p-4">
              <p className="text-sm text-indigo-600 font-medium">Questions</p>
              <p className="text-lg font-semibold text-indigo-700">
                {exam.questions.length}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 font-medium">Language</p>
              <p className="text-lg font-semibold text-gray-900">
                {exam.language}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 font-medium">Formality</p>
              <p className="text-lg font-semibold text-gray-900">
                {exam.formality}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {exam.questions.map((question, index) => {
            const is_visible = visible_answers[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div
                  className="flex justify-between items-start p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  onClick={change_visibility(index)}
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-start mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mr-3 flex-shrink-0 mt-1">
                        {index + 1}
                      </span>
                      <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                        {question.question_text}
                      </p>
                    </div>
                  </div>

                  <button className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 rounded-xl p-3">
                    <FontAwesomeIcon
                      icon={is_visible ? faChevronUp : faChevronDown}
                      className="text-white text-lg"
                    />
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {is_visible && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                        <div className="space-y-3 ml-11">
                          {[
                            { key: "a", label: "A", value: question.a },
                            { key: "b", label: "B", value: question.b },
                            { key: "c", label: "C", value: question.c },
                            { key: "d", label: "D", value: question.d },
                          ].map((option) => {
                            const selectedAnswer = selected_answers[index];
                            const isSelected = selectedAnswer === option.key;
                            const isCorrect =
                              option.key === question.correct.toLowerCase();

                            let bgColor = "bg-gray-50 hover:bg-gray-100";
                            if (show_correct_answers && isCorrect) {
                              bgColor = "bg-green-50 border border-green-200";
                            } else if (isSelected && !show_correct_answers) {
                              bgColor = isCorrect
                                ? "bg-green-50 border border-green-200"
                                : "bg-red-50 border border-red-200";
                            }

                            return (
                              <div
                                key={option.key}
                                className={`flex items-start p-3 rounded-lg transition-colors duration-200 cursor-pointer ${bgColor}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectAnswer(index, option.key);
                                }}
                              >
                                {getOptionIcon(
                                  option.key,
                                  question.correct,
                                  index,
                                )}
                                <span className="font-medium text-gray-700 mr-2">
                                  {option.label}:
                                </span>
                                <span className="text-gray-900">
                                  {option.value}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Exam;
