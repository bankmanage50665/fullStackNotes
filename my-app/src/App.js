import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import "./index.css";
import RootLayout from "./shared/navigation/RootLayout";
import SignupForm, { action as signupAction } from "./shared/component/Signup";
import LoginForm, { action as loginAction } from "./shared/component/Login";

import ErrorHandler from "./shared/component/Error";

import QuizComponent, {
  renderQuizLoader,
} from "./components/Quiz/RenderQuiz.jsx";
import QuestionCreator from "./components/Quiz/AddQuiz";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <ErrorHandler />,
    children: [
      { index: true, element: <h1>Home page</h1> },

      { path: "addQuiz", element: <QuestionCreator /> },
      {
        path: "quizs",
        id: "quiz",
        loader: renderQuizLoader,
        children: [
          { index: true, element: <QuizComponent />, loader: renderQuizLoader },
        ],
      },

      { path: "signup", element: <SignupForm />, action: signupAction },
      { path: "login", element: <LoginForm />, action: loginAction },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
