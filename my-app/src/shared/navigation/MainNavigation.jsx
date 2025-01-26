import React from "react";
import { NavLink } from "react-router-dom";
import { BookOpen } from "lucide-react";

function MainNavigation() {
  return (
    <nav className="bg-gray-900 shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center py-6 px-8">
        <div className="flex items-center">
          <span className="text-white text-xl font-bold">AgriQuiz</span>
        </div>

        <div className="flex items-center">
          <ul className="flex gap-8">
            <li className="ml-auto mr-4">
              <NavLink
                to="/quizs"
                className={({ isActive }) => `
      flex items-center gap-2 
      px-5 py-3 
      mx-6
      rounded-lg 
      font-medium 
      transition-all duration-300 
      transform 
      hover:scale-105 
      hover:shadow-md
      ${
        isActive
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
          : "text-gray-300 hover:text-white hover:bg-gray-800"
      }
    `}
              >
                <BookOpen className="w-5 h-5" />
                <span>Quizzes</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MainNavigation;
