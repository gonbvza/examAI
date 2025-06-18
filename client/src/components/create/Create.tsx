import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFileUpload,
  faFileText,
  faQuestionCircle,
  faBookOpen,
  faTimes,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const Create = () => {
  const [resourceType, setResourceType] = useState({
    exam: false,
    summary: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    topic: "",
    language: "English",
    formality: "Formal",
    content: "",
    uploadedFile: null as File | null,
    questionNumbers: 0,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputMethod, setInputMethod] = useState("" as string);
  const [showBody, setShowBody] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, uploadedFile: file });
    }
  };

  const handleResource = (option: string) => {
    console.log(option);

    const updated = {
      ...resourceType,
      [option]: !resourceType[option],
    };

    setResourceType(updated);

    for (let show of Object.values(updated)) {
      if (show) {
        setShowBody(true);
        return
      } else {
        setShowBody(false);
      }
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // TODO: Implement API call to generate resources
    setTimeout(() => {
      setIsGenerating(false);
      console.log("Generated resource with:", {
        formData,
        resourceType,
      });
    }, 2000);
  };

  const isFormValid = () => {
    if (!resourceType || !formData.name || !formData.topic) return false;
    if (!inputMethod) return false;
    if (inputMethod === "text" && !formData.content) return false;
    if (inputMethod === "file" && !formData.uploadedFile) return false;
    if (
      resourceType["exam"] &&
      formData.questionNumbers <= 0 ||
      formData.questionNumbers == null
    )
      return false;
    return true;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Create New Resource
          </h1>
          <p className="text-gray-600 text-lg">
            Generate summaries and exams from your content
          </p>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              What would you like to create?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  type: "summary",
                  icon: faBookOpen,
                  title: "Summary Only",
                  desc: "Generate a comprehensive summary",
                },
                {
                  type: "exam",
                  icon: faQuestionCircle,
                  title: "Exam Only",
                  desc: "Create questions with answers",
                },
              ].map(option => (
                <button
                  key={option.type}
                  onClick={() => handleResource(option.type as any)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    resourceType[option.type]
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={option.icon}
                    className={`text-2xl mb-3 ${
                      resourceType === option.type
                        ? "text-indigo-600"
                        : "text-gray-400"
                    }`}
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{option.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence>
            summary
            {showBody && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Basic Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resource Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., History of Rome Study Guide"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Topic *
                      </label>
                      <input
                        type="text"
                        value={formData.topic}
                        onChange={e =>
                          setFormData({ ...formData, topic: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., Ancient History"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={formData.language}
                        onChange={e =>
                          setFormData({ ...formData, language: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Italian">Italian</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Formality Level
                      </label>
                      <select
                        value={formData.formality}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            formality: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="Formal">Formal</option>
                        <option value="Semi-formal">Semi-formal</option>
                        <option value="Casual">Casual</option>
                      </select>
                    </div>
                    {resourceType["exam"] && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Question Numbers
                        </label>
                        <input
                          value={formData.questionNumbers}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              questionNumbers: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Content Input
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={() => setInputMethod("text")}
                      className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                        inputMethod === "text"
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faFileText}
                        className={`text-2xl mb-3 ${
                          inputMethod === "text"
                            ? "text-indigo-600"
                            : "text-gray-400"
                        }`}
                      />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Plain Text
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Paste or type your content directly
                      </p>
                    </button>

                    <button
                      onClick={() => setInputMethod("file")}
                      className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                        inputMethod === "file"
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faFileUpload}
                        className={`text-2xl mb-3 ${
                          inputMethod === "file"
                            ? "text-indigo-600"
                            : "text-gray-400"
                        }`}
                      />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Upload File
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Upload a PDF or text document
                      </p>
                    </button>
                  </div>

                  <AnimatePresence>
                    {inputMethod === "text" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <textarea
                          value={formData.content}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              content: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[200px]"
                          placeholder="Paste your content here..."
                        />
                      </motion.div>
                    )}

                    {inputMethod === "file" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <input
                            type="file"
                            accept=".pdf,.txt,.docx"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                          />
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer"
                          >
                            <FontAwesomeIcon
                              icon={faFileUpload}
                              className="text-4xl text-gray-400 mb-4"
                            />
                            <p className="text-lg font-medium text-gray-900 mb-2">
                              {formData.uploadedFile
                                ? formData.uploadedFile.name
                                : "Click to upload a file"}
                            </p>
                            <p className="text-gray-600">
                              PDF, DOC, DOCX, or TXT files supported
                            </p>
                          </label>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Ready to Generate?
                      </h3>
                      <p className="text-gray-600">
                        {resourceType === "both"
                          ? "Create both summary and exam"
                          : resourceType === "exam"
                            ? "Generate exam questions"
                            : "Create comprehensive summary"}
                      </p>
                    </div>

                    <button
                      onClick={handleGenerate}
                      disabled={!isFormValid() || isGenerating}
                      className={`flex items-center px-8 py-4 rounded-lg transition-all duration-200 font-medium text-lg ${
                        isFormValid() && !isGenerating
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faCheck} className="mr-3" />
                          Generate Resource
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Create;
