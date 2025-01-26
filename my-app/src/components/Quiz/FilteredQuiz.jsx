import { useState } from "react";
import { Filter } from "lucide-react";
import { userId } from "../../middleware/getToken";

import QuestionActions from "../../shared/component/QuestionActions";

export default function FilteredQuiz({
  filteredQuestions,
  setFilters,
  filters,
}) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Board Options
  const boardOptions = ["CBSE", "State Boards", "NCERT"];

  // Class Options
  const classOptions = [
    "11",
    "12",
    "1st Year",
    "2nd Year",
    "3rd Year",
    "final Year",
    "Other",
  ];

  // Subject Options
  const subjectOptions = [
    "Agronomy",
    "Horticulture",
    "Animal Husbandry",
    "Soil Science",
    "Plant Pathology",
    "Agricultural Entomology",
    "Agricultural Economics",
    "Agricultural Engineering",
    "Plant Breeding and Genetics",
    "Crop Physiology",
    "Agroforestry",
    "Sericulture",
    "Agricultural Biotechnology",
    "Organic Farming",
    "Weed Science",
    "Agricultural Microbiology",
    "Extension Education",
    "Environmental Science",
    "Agricultural Statistics",
    "Computer Science",
    "Economics",
  ];

  // Exam Options
  const examOptions = [
    "School Exam",
    "Board Exam",
    "Competitive Exam",
    "JET Agriculture (Joint Entrance Test for Rajasthan Agriculture)",
    "Rajasthan pre pg",
    "Entrance Exam",
    "Olympiad",
    "ICAR AIEEA (UG) - Indian Council of Agricultural Research All India Entrance Examination for UG",
    "State Agriculture University Entrance Exams",
    "CUET (UG) - Common University Entrance Test for Agriculture Courses",
    "TNAU Entrance Exam (Tamil Nadu Agricultural University UG Admissions)",
    "BHU UET (Banaras Hindu University Undergraduate Entrance Test for Agriculture)",
    "Nagaland University Agriculture Entrance Exam",
    "Other",
  ];

  // Vibration function
  const vibrate = (pattern) => {
    if ("vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  };

  // Handle option selection
  const handleOptionSelect = (questionIndex, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));

    const correctAnswer = filteredQuestions[questionIndex]?.correctAnswer;

    // Vibrate based on answer correctness
    if (selectedOption === correctAnswer) {
      // Single short vibration for correct answer
      vibrate(100);
    } else {
      // Two short vibrations for incorrect answer
      vibrate([100, 50, 100]);
    }
  };

  // Get option color based on selection and correctness
  const getOptionColor = (questionIndex, option) => {
    const selectedAnswer = selectedAnswers[questionIndex];
    const correctAnswer = filteredQuestions[questionIndex]?.correctAnswer;

    if (!selectedAnswer) {
      return "bg-gray-700 border border-gray-600 hover:bg-gray-600";
    }

    if (selectedAnswer === option) {
      return option === correctAnswer
        ? "bg-green-500 text-white border border-green-600"
        : "bg-red-500 text-white border border-red-600";
    }

    return "bg-gray-700 border border-gray-600 hover:bg-gray-600";
  };

  // Update filter
  const updateFilter = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      board: "",
      class: "",
      subject: "",
      exam: "",
    });
  };

  // Toggle drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Close drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="flex relative bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">
        {/* Enhanced Filter Button with Pulse Effect */}
        <button
          onClick={toggleDrawer}
          className="fixed top-4 right-4 z-50 p-3 bg-indigo-600 text-white rounded-lg shadow-lg
               hover:bg-indigo-500 transform hover:scale-105 transition-all duration-200
               active:scale-95 group animate-pulse hover:animate-none"
          aria-label="Open Filters"
        >
          <Filter className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
        </button>

        {/* Enhanced Drawer with Smooth Transitions */}
        <div
          className={`fixed inset-y-0 right-0 w-80 shadow-2xl z-40 overflow-y-auto
                 bg-gray-800/95 backdrop-blur-xl transform transition-all duration-500 ease-in-out
                 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2
                className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent
                        animate-gradient-x"
              >
                Filter Questions
              </h2>
              <button
                onClick={closeDrawer}
                className="text-gray-400 hover:text-white transform hover:rotate-180 transition-all duration-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {[
                { label: "Board", options: boardOptions, key: "board" },
                { label: "Class", options: classOptions, key: "class" },
                { label: "Subject", options: subjectOptions, key: "subject" },
                { label: "Exam", options: examOptions, key: "exam" },
              ].map((filter) => (
                <div
                  key={filter.key}
                  className="group transform transition-all duration-200 hover:-translate-y-1"
                >
                  <label className="text-sm text-gray-400 block mb-2 transition-colors group-hover:text-indigo-400">
                    {filter.label}
                  </label>
                  <select
                    value={filters[filter.key]}
                    onChange={(e) => updateFilter(filter.key, e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600
                         hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500
                         focus:ring-opacity-50 transition-all duration-300 outline-none transform"
                  >
                    <option value="">Select {filter.label}</option>
                    {filter.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <button
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium
                     hover:from-indigo-500 hover:to-purple-500 transform hover:scale-105 active:scale-95
                     transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Overlay with Blur Effect */}
        <div
          onClick={closeDrawer}
          className={`fixed inset-0  bg-black transition-all duration-500
                 ${
                   isDrawerOpen ? "opacity-50" : "opacity-0 pointer-events-none"
                 }`}
        />

        {/* Enhanced Main Content */}
        <div className="w-full p-6 max-w-7xl mx-auto">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 animate-gradient-x">
              Showing {filteredQuestions.length} Questions
            </h3>
          </div>

          <div className="grid gap-6">
            {filteredQuestions.map((item, questionIndex) => (
              <div
                key={questionIndex}
                className="p-6 rounded-xl bg-gray-800/50  border border-gray-700
                     hover:border-indigo-500 transform hover:-translate-y-2 transition-all duration-300
                     shadow-lg hover:shadow-2xl group"
              >
                <h2 className="text-lg font-medium mb-4">
                  <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300 inline-block mr-2">
                    {questionIndex + 1}.
                  </span>
                  <span
                    className="group-hover:text-white transition-colors duration-300 whitespace-pre-line inline-block"
                    style={{
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {item.question}
                  </span>
                </h2>

                <div className="flex flex-wrap gap-2">
                  {item.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      onClick={() => handleOptionSelect(questionIndex, option)}
                      className={`flex-1 min-w-[200px] p-3 rounded-lg transform hover:scale-102 transition-all duration-300
                            ${getOptionColor(questionIndex, option)}
                            hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
                            group-hover:shadow-md`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <QuestionActions itemId={item._id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
