import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileText,
  faGraduationCap,
  faPlus,
  faEye,
  faChartLine,
  faCalendarAlt,
  faClock,
  faArrowRight,
  faBookOpen,
  faLightbulb,
  faTrophy,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

interface Resources {
  summaries: number;
  exams: number;
}

interface ExtendedResources extends Resources {
  totalQuestions?: number;
  lastUpdated?: string;
  averageScore?: number;
  studyHours?: number;
  completionRate?: number;
  difficulty?: string;
}

const TopicResources = () => {
  const [topic_name, setTopicName] = useState("Physics" as string);
  const [resources, setResources] = useState<ExtendedResources>({
    summaries: 0,
    exams: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/mocks/topic_resources_mock.json");
        const data = await response.json();

        // Simulate additional data for demo purposes
        const enhancedData = {
          ...data,
          totalQuestions: data.exams * 15, // Assume 15 questions per exam
          lastUpdated: "2024-06-15",
          averageScore: 85.4,
          studyHours: 24.5,
          completionRate: 78,
          difficulty: "Intermediate",
        };

        setResources(enhancedData);
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const getTopicGradient = () => {
    const topicGradients: { [key: string]: string } = {
      Physics: "from-blue-500 to-indigo-600",
      Mathematics: "from-purple-500 to-pink-600",
      Chemistry: "from-green-500 to-teal-600",
      Biology: "from-orange-500 to-red-600",
      History: "from-yellow-500 to-orange-600",
      Literature: "from-indigo-500 to-purple-600",
    };
    return topicGradients[topic_name] || "from-indigo-500 to-purple-600";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading resources...</p>
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="flex items-center mb-4 lg:mb-0">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {topic_name} Resources
                </h1>
                <p className="text-lg text-gray-600">
                  Your comprehensive learning materials for{" "}
                  {topic_name.toLowerCase()}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <a href="/create">
                <button className="cursor-pointer flex items-center justify-center p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors duration-200 group">
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-indigo-600 mr-3 group-hover:scale-110 transition-transform duration-200"
                  />
                  <span className="font-medium text-indigo-700">
                    Create Resource
                  </span>
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <a href="/summaries">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -ml-10 -mb-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <FontAwesomeIcon icon={faFileText} className="text-4xl" />
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-xl opacity-70 group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Study Summaries</h2>
                  <p className="text-indigo-100 text-lg">
                    Comprehensive study materials and notes
                  </p>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-indigo-600 mb-2">
                      {resources.summaries}
                    </p>
                    <p className="text-gray-600 font-medium">
                      Available Summaries
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-indigo-50 rounded-xl p-4">
                      <FontAwesomeIcon
                        icon={faBookOpen}
                        className="text-2xl text-indigo-600 mb-2"
                      />
                      <p className="text-sm text-gray-600">Ready to study</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-medium text-gray-900">
                      {resources.lastUpdated
                        ? new Date(resources.lastUpdated).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Total Pages</span>
                    <span className="font-medium text-gray-900">
                      {resources.summaries * 8}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </a>

          {/* TODO: Change this to the corresponding questions */}
          <a href="/exams">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="bg-gradient-to-br from-green-500 to-teal-600 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -ml-10 -mb-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      className="text-4xl"
                    />
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-xl opacity-70 group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Practice Exams</h2>
                  <p className="text-green-100 text-lg">
                    Test your knowledge and track progress
                  </p>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-green-600 mb-2">
                      {resources.exams}
                    </p>
                    <p className="text-gray-600 font-medium">Practice Exams</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <FontAwesomeIcon
                        icon={faTrophy}
                        className="text-2xl text-green-600 mb-2"
                      />
                      <p className="text-sm text-gray-600">
                        Challenge yourself
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Total Questions</span>
                    <span className="font-medium text-gray-900">
                      {resources.totalQuestions}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Average Score</span>
                    <span className="font-medium text-gray-900">
                      {resources.averageScore}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopicResources;
