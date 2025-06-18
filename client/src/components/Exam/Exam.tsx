import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";

interface question {
  question_text: string; // ✅ Fixed: lowercase string
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

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="p-[32px] w-[100%] flex items-center justify-center">
          <p className="text-lg">Loading exam...</p>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="p-[32px] w-[100%] flex items-center justify-center">
          <p className="text-lg">Failed to load exam.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">{exam.name}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>
            <strong>Date:</strong> {exam.date}
          </span>
          <span></span>
          <span>
            <strong>Questions:</strong>{" "}
            <span className="text-[#6366F1] font-semibold">
              {exam.questions.length}
            </span>
          </span>
          <span>
            <strong>Language:</strong> {exam.language}
          </span>
          <span>
            <strong>Formality:</strong> {exam.formality}
          </span>
        </div>
      </div>
      <div className="question-display">
        {exam.questions.map((question, index) => (
          <div key={index} className="border-gray">
            <p>{question.question_text}</p>
            <div>
              <p>A: {question.a}</p>
              <p>B: {question.b}</p>
              <p>C: {question.c}</p>
              <p>D: {question.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exam;

