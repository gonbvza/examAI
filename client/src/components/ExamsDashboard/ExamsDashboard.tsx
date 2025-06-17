import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";

interface Exam {
  name: string;
  date: string;
  questions: number;
  language: string;
  formality: string;
}

interface ExamsData {
  exams: Exam[];
}

const ExamsDashboard = () => {
  const [topic_name, setTopicName] = useState("Physics" as string);
  const [examsData, setExamsData] = useState<ExamsData>({ exams: [] });

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch("/mocks/exams_dashboard_mock.json");
        const data = await response.json();
        setExamsData(data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };
    fetchExams();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="p-4 sm:p-8 lg:p-[32px] w-full">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10">
          Exams for {topic_name}
        </h1>
        <div className="mt-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Exams ({examsData.exams.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {examsData.exams.map((exam, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <h3 className="font-bold text-lg mb-3">{exam.name}</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Date:</span> {exam.date}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Questions:</span>
                    <span className="text-[#6366F1] font-semibold ml-1">
                      {exam.questions}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Language:</span>{" "}
                    {exam.language}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Formality:</span>{" "}
                    {exam.formality}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamsDashboard;
