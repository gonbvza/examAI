import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileText,
  faCalendarAlt,
  faQuestionCircle,
  faLanguage,
  faGraduationCap,
  faPlus,
  faSearch,
  faFilter,
  faSortAmountDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface Exam {
  name: string;
  date: string;
  questions: number;
  language: string;
  formality: string;
}

interface ExamsData {
  topic_name: string;
  exams: Exam[];
}

const ExamsDashboard = () => {
  const [examsData, setExamsData] = useState({
    topic_name: "",
    exams: [],
  } as ExamsData);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterLanguage, setFilterLanguage] = useState("all");

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch("/mocks/exams_dashboard_mock.json");
        const data = await response.json();
        setExamsData(data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  const filteredExams = examsData.exams
    .filter((exam: Exam) =>
      exam.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((exam: Exam) =>
      filterLanguage === "all" ? true : exam.language === filterLanguage
    )
    .sort((a: any, b: any) => {
      if (sortBy === "date")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "questions") return b.questions - a.questions;
      return 0;
    });

  const uniqueLanguages = [
    ...new Set(examsData.exams.map((exam: any) => exam.language)),
  ];

  const getGradientByIndex = (index: number) => {
    const gradients = [
      "from-indigo-500 to-purple-600",
      "from-blue-500 to-indigo-600",
      "from-purple-500 to-pink-600",
      "from-green-500 to-teal-600",
      "from-orange-500 to-red-600",
      "from-teal-500 to-cyan-600",
    ];
    return gradients[index % gradients.length];
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading exams...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {examsData.topic_name} Exams
              </h1>
              <p className="text-lg text-gray-600">
                Manage and access your {examsData.topic_name.toLowerCase()}{" "}
                examinations
              </p>
            </div>
            <button className="cursor-pointer mt-4 lg:mt-0 flex items-center px-6 py-3 bg-[#6366f1] hover:bg-indigo-700 text-white rounded-xl transition-colors duration-200 font-medium shadow-lg hover:shadow-xl">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Create New Exam
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm font-medium">
                    Total Exams
                  </p>
                  <p className="text-2xl font-bold">{examsData.exams.length}</p>
                </div>
                <FontAwesomeIcon
                  icon={faFileText}
                  className="text-2xl text-indigo-200"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">
                    Total Questions
                  </p>
                  <p className="text-2xl font-bold">
                    {examsData.exams.reduce(
                      (sum, exam) => sum + exam.questions,
                      0
                    )}
                  </p>
                </div>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className="text-2xl text-green-200"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">
                    Languages
                  </p>
                  <p className="text-2xl font-bold">{uniqueLanguages.length}</p>
                </div>
                <FontAwesomeIcon
                  icon={faLanguage}
                  className="text-2xl text-orange-200"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">
                    This Month
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      examsData.exams.filter((exam: Exam) => {
                        let summary_date = new Date(exam.date);
                        let current = new Date();
                        if (
                          summary_date.getMonth() == current.getMonth() &&
                          summary_date.getFullYear() == current.getFullYear()
                        )
                          return true;
                        return false;
                      }).length
                    }
                  </p>
                </div>
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-2xl text-purple-200"
                />
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="relative flex-1">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search exams..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            <div className="flex gap-3">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faFilter}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <select
                  value={filterLanguage}
                  onChange={e => setFilterLanguage(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6366f1] focus:border-transparent outline-none transition-all duration-200 bg-white"
                >
                  <option value="all">All Languages</option>
                  {uniqueLanguages.map(lang => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <FontAwesomeIcon
                  icon={faSortAmountDown}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
                >
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="questions">Sort by Questions</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredExams.map((exam, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Card Header with Gradient */}
              <div
                className={`bg-gradient-to-r ${getGradientByIndex(index)} p-6 text-white relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -mr-12 -mt-12"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -ml-8 -mb-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-lg opacity-70 group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 leading-tight">
                    {exam.name}
                  </h3>
                  <div className="flex items-center text-sm opacity-90">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    {new Date(exam.date).toLocaleDateString("es-ES", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 rounded-lg p-3">
                    <p className="text-sm text-indigo-600 font-medium mb-1">
                      Questions
                    </p>
                    <p className="text-lg font-bold text-indigo-700">
                      {exam.questions}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-500 font-medium mb-1">
                      Language
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {exam.language}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Formality Level
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map(level => (
                            <div
                              key={level}
                              className={`w-2 h-2 rounded-full ${
                                level <=
                                (exam.formality === "Formal"
                                  ? 5
                                  : exam.formality === "Semi-formal"
                                    ? 3
                                    : 1)
                                  ? "bg-indigo-500"
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-700">
                          {exam.formality}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No exams found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterLanguage !== "all"
                ? "Try adjusting your search or filter criteria."
                : `No exams available for ${examsData.topic_name} yet.`}
            </p>
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors duration-200 font-medium">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Create Your First Exam
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamsDashboard;
