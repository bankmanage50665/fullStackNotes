import React, { useState } from "react";

import { ThreeDot } from "react-loading-indicators";

const QuestionCreator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [additionalFields, setAdditionalFields] = useState({
    board: "",
    class: "",
    subject: "",
    topic: "",
    exam: "",
  });

  const userId = localStorage.getItem("id");

  // Predefined options for dropdowns (unchanged)
  const boardOptions = ["CBSE", "State Boards", "NCERT"];

  const classOptions = [
    "11",
    "12",
    "1st Year",
    "2nd Year",
    "3rd Year",
    "final Year",
    "Other",
  ];

  const subjectOptions = [
    "Agronomy",
    "Animal Husbandry",
    "Horticulture",
    "Soil Science",
    "Plant Pathology",
    "Agricultural Entomology",
    "Agricultural Economics",
    "Agricultural Engineering",
    "Plant Breeding and Genetics",
    "Crop Physiology",
    "Agroforestry",

    "Agricultural Biotechnology",
    "Organic Farming",
    "Weed Science",
    "Agricultural Microbiology",
    "Extension Education",
    "Food Science and Technology",
    "Environmental Science",
    "Agricultural Statistics",
    "Computer Science",

    "Economics",
    "Accountancy",
  ];

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

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (indexToRemove) => {
    const newOptions = options.filter((_, index) => index !== indexToRemove);
    setOptions(newOptions);

    // Reset correct answer if it was the removed option
    if (correctAnswer === options[indexToRemove]) {
      setCorrectAnswer("");
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAdditionalFieldChange = (field, value) => {
    setAdditionalFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const questionData = {
      question,
      options,
      correctAnswer,
      ...additionalFields,
    };

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/questions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...questionData, creator: userId }),
      }
    );
    const resData = await response.json();

    console.log(resData);

    setIsLoading(false);
    // Reset form after submission
    setQuestion("");
    setOptions([""]);
    setCorrectAnswer("");
    setAdditionalFields({
      board: "",
      class: "",
      subject: "",
      topic: "",
      exam: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded bg-gray-900 text-gray-100">
      <h2 className="text-xl font-bold mb-4 text-white">Question Creator</h2>

      <div className="space-y-4">
        {/* Question Input */}
        <textarea
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded resize-y min-h-[100px] bg-gray-800 text-gray-100 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          wrap="hard"
          rows="4"
          spellCheck="false"
        />

        {/* Options Inputs */}
        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-grow p-2 border rounded bg-gray-800 text-gray-100 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="radio"
                name="correctAnswer"
                checked={correctAnswer === option}
                onChange={() => setCorrectAnswer(option)}
                className="w-5 h-5 text-blue-600 bg-gray-800 border-gray-700 focus:ring-blue-600"
              />
              {options.length > 1 && (
                <button
                  onClick={() => removeOption(index)}
                  className="bg-red-700 text-white p-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addOption}
            className="mt-2 w-full p-2 border rounded bg-green-700 text-white hover:bg-green-600"
          >
            Add Option
          </button>
        </div>

        {/* Additional Fields */}
        <div className="grid grid-cols-2 gap-4">
          {/* Board Dropdown */}
          <select
            value={additionalFields.board}
            onChange={(e) =>
              handleAdditionalFieldChange("board", e.target.value)
            }
            className="p-2 border rounded bg-gray-800 text-gray-100 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="" className="bg-gray-900">
              Select Board
            </option>
            {boardOptions.map((board) => (
              <option key={board} value={board} className="bg-gray-900">
                {board}
              </option>
            ))}
          </select>

          {/* Class Dropdown */}
          <select
            value={additionalFields.class}
            onChange={(e) =>
              handleAdditionalFieldChange("class", e.target.value)
            }
            className="p-2 border rounded bg-gray-800 text-gray-100 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="" className="bg-gray-900">
              Select Class
            </option>
            {classOptions.map((classOption) => (
              <option
                key={classOption}
                value={classOption}
                className="bg-gray-900"
              >
                {classOption}
              </option>
            ))}
          </select>

          {/* Subject Dropdown */}
          <select
            value={additionalFields.subject}
            onChange={(e) =>
              handleAdditionalFieldChange("subject", e.target.value)
            }
            className="p-2 border rounded bg-gray-800 text-gray-100 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="" className="bg-gray-900">
              Select Subject
            </option>
            {subjectOptions.map((subject) => (
              <option key={subject} value={subject} className="bg-gray-900">
                {subject}
              </option>
            ))}
          </select>

          {/* Topic Input (kept as input) */}
          <input
            type="text"
            placeholder="Topic"
            value={additionalFields.topic}
            onChange={(e) =>
              handleAdditionalFieldChange("topic", e.target.value)
            }
            className="p-2 border rounded bg-gray-800 text-gray-100 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* Exam Dropdown */}
          <select
            value={additionalFields.exam}
            onChange={(e) =>
              handleAdditionalFieldChange("exam", e.target.value)
            }
            className="p-2 border rounded bg-gray-800 text-gray-100 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="" className="bg-gray-900">
              Select Exam
            </option>
            {examOptions.map((exam) => (
              <option key={exam} value={exam} className="bg-gray-900">
                {exam}
              </option>
            ))}
          </select>
        </div>

        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="w-full p-2 bg-blue-700 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? (
            <ThreeDot
              variant="bounce"
              color="#32cd32"
              size="medium"
              text="Loading"
              textColor=""
            />
          ) : (
            "Create Question"
          )}
        </button>
      </div>
    </div>
  );
};

export default QuestionCreator;
