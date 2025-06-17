import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";

interface Summary {
  name: string;
  date: string;
  words: number;
  language: string;
  formality: string;
}

interface Resources {
  summaries: Summary[];
}

const SummaryDashboard = () => {
  const [topic_name, setTopicName] = useState("Physics" as string);
  const [resources, setResources] = useState<Resources>({ summaries: [] });

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/mocks/summary_dashboard_mock.json");
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
        <p className="text-3xl font-bold mb-10">Summaries for {topic_name}</p>

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-6">
            Summaries ({resources.summaries.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {resources.summaries.map((summary, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow mb-4 cursor-pointer hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-bold text-lg mb-3">{summary.name}</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Date:</span> {summary.date}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Words:</span>
                    <span className="text-[#6366F1] font-semibold ml-1">
                      {summary.words}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Language:</span>{" "}
                    {summary.language}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Formality:</span>{" "}
                    {summary.formality}
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

export default SummaryDashboard;
