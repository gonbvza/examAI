import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";

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
    // PDF download functionality to be implemented
    console.log("Download PDF clicked");
  };

  const handleCopyToClipboard = () => {
    // Copy to clipboard functionality to be implemented
    console.log("Copy to clipboard clicked");
  };

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="p-[32px] w-[100%] flex items-center justify-center">
          <p className="text-lg">Loading summary...</p>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="p-[32px] w-[100%] flex items-center justify-center">
          <p className="text-lg text-red-500">Error loading summary</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-[32px] w-[100%]">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{summary.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>
                  <strong>Topic:</strong> {summary.topic}
                </span>
                <span>
                  <strong>Date:</strong> {summary.date}
                </span>
                <span>
                  <strong>Words:</strong>{" "}
                  <span className="text-[#6366F1] font-semibold">
                    {summary.words}
                  </span>
                </span>
                <span>
                  <strong>Language:</strong> {summary.language}
                </span>
                <span>
                  <strong>Formality:</strong> {summary.formality}
                </span>
              </div>
            </div>

            <div className="flex gap-4 ml-8">
              <button
                onClick={handleDownloadPDF}
                className="bg-[#6366F1] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#5856EB] transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download PDF
              </button>
              <button
                onClick={handleCopyToClipboard}
                className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-8">
          <div className="prose max-w-none">
            {summary.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDisplay;

