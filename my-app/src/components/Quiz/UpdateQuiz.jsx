import React, { useState } from "react";

const UpdateQuiz = () => {
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

    // console.log("Question Data:", questionData);

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
        <input
          type="text"
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded"
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
          {Object.keys(additionalFields).map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={additionalFields[field]}
              onChange={(e) =>
                handleAdditionalFieldChange(field, e.target.value)
              }
              className="p-2 border rounded"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Create Question
        </button>
      </div>
    </div>
  );
};

export default UpdateQuiz;