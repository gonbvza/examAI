import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faCopy } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

interface Summary {
  name: string;
  date: string;
  words: number;
  language: string;
  formality: string;
  content: string;
  topic: string;
}

const SummaryDisplay = () => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch("/mocks/summary_mock.json");
        const data = await response.json();
        setSummary(data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const handleDownloadPDF = () => {
    console.log("Download PDF clicked");
  };

  const handleCopyToClipboard = () => {
    if (summary?.content) {
      navigator.clipboard.writeText(summary.content);
      console.log("Content copied to clipboard");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading summary...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <p className="text-lg text-gray-600">Failed to load summary.</p>
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl font-bold text-gray-900">{summary.name}</h1>

            <div className="flex gap-3">
              <button
                onClick={handleDownloadPDF}
                className="cursor-pointer flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors duration-200 font-medium text-sm"
              >
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Download PDF
              </button>

              <button
                onClick={handleCopyToClipboard}
                className="cursor-pointer flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm"
              >
                <FontAwesomeIcon icon={faCopy} className="mr-2" />
                Copy Text
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 font-medium">Topic</p>
              <p className="text-lg font-semibold text-gray-900">
                {summary.topic}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 font-medium">Date</p>
              <p className="text-lg font-semibold text-gray-900">
                {summary.date}
              </p>
            </div>

            <div className="bg-indigo-50 rounded-lg p-4">
              <p className="text-sm text-indigo-600 font-medium">Words</p>
              <p className="text-lg font-semibold text-indigo-700">
                {summary.words}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 font-medium">Language</p>
              <p className="text-lg font-semibold text-gray-900">
                {summary.language}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 font-medium">Formality</p>
              <p className="text-lg font-semibold text-gray-900">
                {summary.formality}
              </p>
            </div>
          </div>
        </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="prose max-w-none">
              {summary.content.split("\n\n").map((paragraph:any, index:any) => (
                <p
                  key={index}
                  className="mb-6 text-gray-800 leading-relaxed text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
      </div>
    </div>
  );
};

export default SummaryDisplay;
