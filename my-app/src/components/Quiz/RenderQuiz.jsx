import { useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import FilteredQuiz from "./FilteredQuiz";

const QuizComponent = () => {
  const [filters, setFilters] = useState({
    board: "",
    class: "",
    subject: "",
    exam: "",
  });

  const filter = useLoaderData();

  console.log(filter);

  // Filtering logic
  const filteredQuestions = filter.questions.filter((question) => {
    return Object.keys(filters).every((key) =>
      filters[key] ? question[key] === filters[key] : true
    );
  });

  return (
    <Await>
      <FilteredQuiz
        filteredQuestions={filteredQuestions}
        filters={filters}
        setFilters={setFilters}
      />
    </Await>
  );
};

export default QuizComponent;

export async function quizLoader(req, res) {
  // First validate that the environment variable exists
  if (!process.env.REACT_APP_BACKEND_URL) {
    console.error("REACT_APP_BACKEND_URL is not defined");
    throw new Error("Backend URL configuration is missing");
  }

  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/questions`;
    console.log("Attempting to fetch from:", url); // Debug log

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Log more details about the error
      const errorText = await response.text();
      console.error("Server response:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });

      throw new Error(
        `Server responded with ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();

    const questionCreator = data.questions[0].creator;
    localStorage.setItem("creator", questionCreator);
    return data;
  } catch (error) {
    console.error("Failed to fetch questions:", {
      message: error.message,
      stack: error.stack,
      // Include the URL being called (but be careful not to log sensitive data)
      url: `${process.env.REACT_APP_BACKEND_URL}/questions`,
    });

    // Rethrow with more context
    throw new Error(`Failed to fetch questions: ${error.message}`);
  }
}
