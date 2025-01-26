import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
import "./index.css";
import RootLayout from "./shared/navigation/RootLayout";
import SignupForm, { action as signupAction } from "./shared/component/Signup";
import LoginForm, { action as loginAction } from "./shared/component/Login";
import UpdateQuiz, {
  handleUpdateLoader,
} from "./components/Quiz/UpdateQuiz.jsx";
import { tokenLoader } from "./middleware/getToken.js";

import ErrorHandler from "./shared/component/Error";
import LoadingIndicator from "./shared/component/Loading.jsx";
import { action as actionLogout } from "./shared/component/Logout.jsx";

import { lazy, Suspense } from "react";

const QuizComponent = lazy(() => import("./components/Quiz/RenderQuiz.jsx"));
const QuestionCreator = lazy(() => import("./components/Quiz/AddQuiz.jsx"));

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <ErrorHandler />,
    loader: tokenLoader,
    id: "token",
    children: [
      { index: true, element: <Navigate to="quizs" replace={true} /> },

      {
        path: "addQuiz",
        element: (
          <Suspense fallback={<LoadingIndicator Loading="loading..." />}>
            <QuestionCreator />
          </Suspense>
        ),
      },
      {
        path: "quizs",

        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingIndicator Loading="loading..." />}>
                <QuizComponent />
              </Suspense>
            ),
            loader: () =>
              import("./components/Quiz/RenderQuiz.jsx").then((module) =>
                module.quizLoader()
              ),
          },

          {
            path: ":id",

            children: [
              {
                index: true,
                element: <UpdateQuiz />,
                loader: handleUpdateLoader,
              },
            ],
          },
        ],
      },

      { path: "signup", element: <SignupForm />, action: signupAction },
      { path: "login", element: <LoginForm />, action: loginAction },
      { path: "logout", action: actionLogout },
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
