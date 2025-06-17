import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";

interface resources {
  summaries: number;
  exams: number;
}

const TopicResources = () => {
  const [topic_name, setTopicName] = useState("Physics" as string);
  const [resources, setResources] = useState({ summaries: 0, exams: 0 });

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/mocks/topic_resources_mock.json");
        const data = await response.json();
        setResources(data);
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
        <p className="text-3xl font-bold mb-10">Resources for {topic_name}</p>

        <div className="mt-6 text-center">
          <div className="bg-white w-[15%] p-10 rounded-xl shadow mb-4 cursor-pointer hover:shadow-lg transition-all duration-300">
            <h3 className="font-semibold text-lg">Summaries</h3>
            <p className="text-gray-600">{resources.summaries}</p>
          </div>
        </div>
        <div className="mt-6 ">
          <div className="bg-white  w-[15%] p-10 rounded-xl text-center shadow mb-4 cursor-pointer hover:shadow-lg transition-all duration-300">
            <h3 className="font-semibold text-lg">Exams</h3>
            <p className="text-gray-600">{resources.exams}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicResources;
