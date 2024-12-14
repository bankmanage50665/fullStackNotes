import React, { useState } from "react";
import { quizData } from "./quizData"; // Import quiz data
import Filters from "./Filter"; // Import Filters component
import { useLoaderData, useRouteLoaderData } from "react-router-dom";

const QuizComponent = () => {
  const [filters, setFilters] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const quistions = useRouteLoaderData("quiz");

  const filteredQuestions = quistions.filter((question) => {
    return Object.keys(filters).every((key) =>
      filters[key] ? question[key] === filters[key] : true
    );
  });

  const handleOptionSelect = (questionIndex, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const getOptionColor = (questionIndex, option) => {
    const selectedAnswer = selectedAnswers[questionIndex];
    const correctAnswer = filteredQuestions[questionIndex]?.correctAnswer;

    if (!selectedAnswer) {
      return "bg-white border border-gray-200 hover:bg-gray-100";
    }

    if (selectedAnswer === option) {
      return option === correctAnswer
        ? "bg-green-500 text-white border border-green-600"
        : "bg-red-500 text-white border border-red-600";
    }

    return "bg-white border border-gray-200 hover:bg-gray-100";
  };

  return (
    <div>
      <Filters filters={filters} setFilters={setFilters} />
      <div className="p-4">
        {filteredQuestions.map((item, questionIndex) => (
          <div
            key={questionIndex}
            className="p-4 border whitespace-pre-line rounded mb-4"
          >
            <h2>
              <span>{questionIndex + 1}. </span>
              {item.question}
            </h2>
            <div className="mt-2">
              {item.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => handleOptionSelect(questionIndex, option)}
                  className={`block w-full p-2 mt-1 rounded ${getOptionColor(
                    questionIndex,
                    option
                  )}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizComponent;

export async function renderQuizLoader(req, res) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/questions`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    // You might want to handle the error differently depending on your use case
    throw error;
  }
}
