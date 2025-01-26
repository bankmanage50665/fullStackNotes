import React, { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";

const UpdateQuiz = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateing, setIsUpdating] = useState(false);

  const [additionalFields, setAdditionalFields] = useState({
    board: "",
    class: "",
    subject: "",
    topic: "",
    exam: "",
  });
  const fetchedQuestions = useLoaderData();

  console.log(fetchedQuestions.question);

  const sp = useParams().id;
  const navigate = useNavigate();

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

    const response = await fetch(
      setIsUpdating(true)`${process.env.REACT_APP_BACKEND_URL}/questions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...questionData }),
      }
    );
    const resData = await response.json();
    setIsUpdating(false);

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

  async function handleDelete() {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/questions/${sp}`,
      {
        method: "DELETE",
      }
    );
    const resData = await response.json();

    setIsLoading(false);
    navigate("/");
  }

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Update Question</h2>

      <div className="space-y-4">
        {/* Question Input */}
        <input
          type="text"
          placeholder="Enter Question"
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded"
          defaultValue={fetchedQuestions ? fetchedQuestions.question : null}
        />

        {/* Options Inputs */}
        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-grow p-2 border rounded"
                defaultValue={
                  fetchedQuestions ? fetchedQuestions.options : null
                }
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
                  {isLoading ? (
                    <ThreeDot
                      variant="bounce"
                      color="#32cd32"
                      size="medium"
                      text="deleteing..."
                      textColor="blue"
                    />
                  ) : (
                    "Delete"
                  )}
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
          {Object.keys(fetchedQuestions.options).map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={fetchedQuestions.options[field]}
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
          {isUpdateing ? (
            <ThreeDot
              variant="bounce"
              color="#32cd32"
              size="medium"
              text="updateing..."
              textColor="blue"
            />
          ) : (
            "Update question"
          )}
        </button>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          {isLoading ? (
            <ThreeDot
              variant="bounce"
              color="#32cd32"
              size="medium"
              text="deleteing..."
              textColor="blue"
            />
          ) : (
            "Delete question"
          )}
        </button>
      </div>
    </div>
  );
};

export default UpdateQuiz;

export async function handleUpdateLoader({ req, params }) {
  const questionId = params.id;

  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/questions/${questionId}`
  );

  const resData = await response.json();

  return resData;
}
