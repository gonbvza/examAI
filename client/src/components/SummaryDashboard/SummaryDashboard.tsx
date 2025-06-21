import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
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
import { motion } from "framer-motion";
import { getGradientByIndex } from "../../helpers/gradient";

interface Summary {
  name: string;
  date: string;
  words: number;
  language: string;
  formality: string;
}

interface summariesData_i {
  topic_name: string;
  summaries: Summary[];
}

const SummaryDashboard = () => {
  const [topic_name, setTopicName] = useState("Physics" as string);
  const [summariesData, setSummariesData] = useState({
    topic_name: "",
    summaries: [],
  } as summariesData_i);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const response = await fetch("/mocks/summary_dashboard_mock.json");
        const data = await response.json();
        console.log(data);
        setSummariesData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    fetchTopics();
  }, []);

  const filteredSummaries = summariesData.summaries
    .filter((summary: Summary) =>
      summary.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((summary: Summary) =>
      filterLanguage === "" || filterLanguage === "all"
        ? true
        : summary.language === filterLanguage
    )
    .sort((a: any, b: any) => {
      if (sortBy === "date")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "questions") return b.questions - a.questions;
      return 0;
    });

  const uniqueLanguages = [
    ...new Set(summariesData.summaries.map((exam: any) => exam.language)),
  ];

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
        {/* Title section */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {summariesData.topic_name} Summaries
              </h1>
              <p className="text-lg text-gray-600">
                Manage and access your {summariesData.topic_name.toLowerCase()}{" "}
                examinations
              </p>
            </div>
            <button className="cursor-pointer mt-4 lg:mt-0 flex items-center px-6 py-3 bg-[#6366f1] hover:bg-indigo-700 text-white rounded-xl transition-colors duration-200 font-medium shadow-lg hover:shadow-xl">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Create New Exam
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm font-medium">
                    Total summaries
                  </p>
                  <p className="text-2xl font-bold">
                    {summariesData.summaries.length}
                  </p>
                </div>
                <FontAwesomeIcon
                  icon={faFileText}
                  className="text-2xl text-indigo-200"
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
                  <p className="text-orange-100 text-sm font-medium">
                    This month
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      summariesData.summaries.filter((summary: Summary) => {
                        let summary_date = new Date(summary.date);
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
                  className="text-2xl text-orange-200"
                />
              </div>
            </div>
          </div>

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
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all duration-200 bg-white"
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

        <div className="grid lg:grid-cols-1 xl:grid-cols-3 gap-6">
          {filteredSummaries.map((summary: Summary, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div
                className={`bg-gradient-to-r ${getGradientByIndex(index)} p-6 text-white relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -mr-12 -mt-12"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -mb-8 -ml-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-lg opacity-70 group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 leading-tight">
                    {summary.name}
                  </h3>
                  <div className="flex items-center text-sm opacity-90">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    {new Date(summary.date).toLocaleString("es-ES", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryDashboard;
