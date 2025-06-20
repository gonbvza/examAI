import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileText,
  faGraduationCap,
  faCalendarAlt,
  faArrowRight,
  faBookOpen,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

interface topic_row {
  name: string;
  date: string;
  summaries: number;
  exams: number;
}

const Dashboard = () => {
  const [topics, setTopics] = useState([] as topic_row[]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/mocks/dashboard_mock.json");
        const data = await response.json();
        setTopics(data.topics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const filteredTopics = topics.filter((topic: topic_row) =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalSummaries = topics.reduce(
    (sum: number, topic: topic_row) => sum + topic.summaries,
    0,
  );
  const totalExams = topics.reduce(
    (sum: number, topic: topic_row) => sum + topic.exams,
    0,
  );

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading your topics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Your Learning Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Manage and track all your study topics in one place
              </p>
            </div>
            <div className="flex gap-3 mt-4 lg:mt-0">
              <a href="/create">
                <button className="cursor-pointer flex items-center justify-center px-6 py-3 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors duration-200 group">
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-indigo-600 mr-3 group-hover:scale-110 transition-transform duration-200"
                  />
                  <span className="font-medium text-indigo-700">Add Topic</span>
                </button>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm font-medium">
                    Total Topics
                  </p>
                  <p className="text-3xl font-bold">{topics.length}</p>
                </div>
                <FontAwesomeIcon
                  icon={faBookOpen}
                  className="text-2xl opacity-80"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">
                    Total Summaries
                  </p>
                  <p className="text-3xl font-bold">{totalSummaries}</p>
                </div>
                <FontAwesomeIcon
                  icon={faFileText}
                  className="text-2xl opacity-80"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Total Exams
                  </p>
                  <p className="text-3xl font-bold">{totalExams}</p>
                </div>
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="text-2xl opacity-80"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
              Your Topics ({filteredTopics.length})
            </h2>
            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-80"
              />
            </div>
          </div>

          {filteredTopics.length === 0 ? (
            <div className="text-center py-12">
              <FontAwesomeIcon
                icon={faBookOpen}
                className="text-6xl text-gray-300 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {searchTerm ? "No topics found" : "No topics yet"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Create your first topic to get started with learning"}
              </p>
              {!searchTerm && (
                <a href="/create">
                  <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors duration-200">
                    Create Your First Topic
                  </button>
                </a>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTopics.map((topic: any, index: any) => (
                // TODO: Change this to point to the corresponding topics
                <a href="/topic">
                  <div
                    key={index}
                    className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div
                      className={`bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white relative overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="text-lg opacity-70 group-hover:translate-x-2 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{topic.name}</h3>
                        <div className="flex items-center text-sm opacity-90">
                          <FontAwesomeIcon
                            icon={faCalendarAlt}
                            className="mr-2"
                          />
                          {new Date(topic.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-indigo-50 rounded-xl">
                          <FontAwesomeIcon
                            icon={faFileText}
                            className="text-2xl text-indigo-600 mb-2"
                          />
                          <p className="text-2xl font-bold text-indigo-600 mb-1">
                            {topic.summaries}
                          </p>
                          <p className="text-sm text-gray-600 font-medium">
                            Summaries
                          </p>
                        </div>

                        <div className="text-center p-4 bg-green-50 rounded-xl">
                          <FontAwesomeIcon
                            icon={faGraduationCap}
                            className="text-2xl text-green-600 mb-2"
                          />
                          <p className="text-2xl font-bold text-green-600 mb-1">
                            {topic.exams}
                          </p>
                          <p className="text-sm text-gray-600 font-medium">
                            Exams
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
