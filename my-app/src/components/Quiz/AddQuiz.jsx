import React, { useState } from "react";

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

  // Predefined options for dropdowns
  const boardOptions = [
    "CBSE",
    "ICSE",
    "State Boards",
    "NCERT",
    
  ];

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
    "Sericulture",
    "Fisheries",
    "Dairy Science",
    "Poultry Science",
    "Agricultural Biotechnology",
    "Organic Farming",
    "Weed Science",
    "Agricultural Microbiology",
    "Extension Education",
    "Food Science and Technology",
    "Environmental Science",
    "Agricultural Statistics",
    "Computer Science",
    "English",
    "Hindi",
    "Social Science",
    "Economics",
    "Accountancy",
  ];

  const examOptions = [
    "School Exam",
    "Board Exam",
    "Competitive Exam",
    "Entrance Exam",
    "Olympiad",
    "ICAR AIEEA (UG) - Indian Council of Agricultural Research All India Entrance Examination for UG",
    "State Agriculture University Entrance Exams",
    "CUET (UG) - Common University Entrance Test for Agriculture Courses",
    "JEE (for Agricultural Engineering in select institutions)",
    "EAMCET (Agriculture and Allied Courses - Andhra Pradesh and Telangana)",
    "KEAM (Kerala Engineering, Architecture, Medical Entrance Exam for Agriculture)",
    "MHT CET (Maharashtra Common Entrance Test for Agriculture Courses)",
    "KCET (Karnataka Common Entrance Test for Agriculture and Allied Courses)",
    "WBJEE (West Bengal Joint Entrance Examination for Agriculture)",
    "TNAU Entrance Exam (Tamil Nadu Agricultural University UG Admissions)",
    "BHU UET (Banaras Hindu University Undergraduate Entrance Test for Agriculture)",
    "JET Agriculture (Joint Entrance Test for Rajasthan Agriculture)",
    "PAT (Pre-Agriculture Test - Madhya Pradesh)",
    "CG PAT (Chhattisgarh Pre Agriculture Test)",
    "UPCATET (Uttar Pradesh Combined Agriculture and Technology Entrance Test)",
    "SAAT (Siksha ‘O’ Anusandhan University Admission Test for Agriculture)",
    "OUAT (Odisha University of Agriculture and Technology Entrance Exam)",
    "Assam Agricultural University Entrance Exam",
    "Nagaland University Agriculture Entrance Exam",
    "CUCET (for Central Universities offering Agriculture UG courses)",
    "Olympiad (Agriculture or related sciences)",
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

    console.log(correctAnswer);

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/questions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...questionData }),
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
    <div className="max-w-2xl mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Question Creator</h2>

      <div className="space-y-4">
        {/* Question Input */}
        <textarea
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded resize-y min-h-[100px]"
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
                className="flex-grow p-2 border rounded"
              />
              <input
                type="radio"
                name="correctAnswer"
                checked={correctAnswer === option}
                onChange={() => setCorrectAnswer(option)}
                className="w-5 h-5"
              />
              {options.length > 1 && (
                <button
                  onClick={() => removeOption(index)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addOption}
            className="mt-2 w-full p-2 border rounded bg-green-500 text-white"
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
            className="p-2 border rounded"
          >
            <option value="">Select Board</option>
            {boardOptions.map((board) => (
              <option key={board} value={board}>
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
            className="p-2 border rounded"
          >
            <option value="">Select Class</option>
            {classOptions.map((classOption) => (
              <option key={classOption} value={classOption}>
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
            className="p-2 border rounded"
          >
            <option value="">Select Subject</option>
            {subjectOptions.map((subject) => (
              <option key={subject} value={subject}>
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
            className="p-2 border rounded"
          />

          {/* Exam Dropdown */}
          <select
            value={additionalFields.exam}
            onChange={(e) =>
              handleAdditionalFieldChange("exam", e.target.value)
            }
            className="p-2 border rounded"
          >
            <option value="">Select Exam</option>
            {examOptions.map((exam) => (
              <option key={exam} value={exam}>
                {exam}
              </option>
            ))}
          </select>
        </div>

        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          {isLoading ? "Submiting" : " Create Question"}
        </button>
      </div>
    </div>
  );
};

export default QuestionCreator;
