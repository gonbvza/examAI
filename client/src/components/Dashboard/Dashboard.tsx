import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";

interface topic_row {
  name: string;
  date: string;
  summaries: number;
  exams: number;
}

const Dashboard = () => {
  const [topics, setTopics] = useState([] as topic_row[]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/mocks/dashboard_mock.json");
        const data = await response.json();
        setTopics(data.topics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-[32px] w-[100%]">
        <p className="text-3xl font-bold mb-10">All your topics</p>

        {/* Example of rendering the topics */}
        <div className="mt-6 ">
          {topics.map((topic: any, index: any) => (
            <div
              key={index}
              className="bg-white w-[80%] p-4 rounded-xl shadow mb-4 cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-semibold text-lg">{topic.name}</h3>
              <div className="flex space-x-2">
                <p className="text-gray-600">Date: {topic.date}</p>
                <p className="text-gray-600">Summaries: {topic.summaries}</p>
                <p className="text-gray-600">Exams: {topic.exams}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
