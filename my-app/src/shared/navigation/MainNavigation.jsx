import { useState } from "react";
import { Moon, Sun } from "lucide-react"; // Import icons if you haven't already

import React from "react";
import { NavLink } from "react-router-dom";
function MainNavigation() {
  const [isDark, setIsDark] = useState(false);

  return (
    <nav
      className={`${isDark ? "bg-gray-900" : "bg-white"} shadow-lg border-b ${
        isDark ? "border-gray-700" : "border-gray-100"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-5 px-6">
        <div className="flex items-center">
          {/* Add your logo here if needed */}
        </div>
        <div className="flex items-center gap-6">
          <ul className="flex gap-6">
            <li>
              <NavLink
                to="/quizs"
                className={({ isActive }) =>
                  isActive
                    ? `${
                        isDark
                          ? "bg-indigo-500 text-white"
                          : "bg-indigo-600 text-white"
                      } px-4 py-2 rounded-lg font-medium shadow-indigo-200 shadow-lg transition-all duration-200`
                    : `${
                        isDark
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-indigo-600"
                      } px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-all duration-200 ${
                        isDark ? "hover:bg-gray-800" : ""
                      }`
                }
              >
                Quizs
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/addQuiz"
                className={({ isActive }) =>
                  isActive
                    ? `${
                        isDark
                          ? "bg-indigo-500 text-white"
                          : "bg-indigo-600 text-white"
                      } px-4 py-2 rounded-lg font-medium shadow-indigo-200 shadow-lg transition-all duration-200`
                    : `${
                        isDark
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-indigo-600"
                      } px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-all duration-200 ${
                        isDark ? "hover:bg-gray-800" : ""
                      }`
                }
              >
                Add Quizs
              </NavLink>
            </li>
          </ul>

          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full ${
              isDark
                ? "bg-gray-800 text-yellow-400"
                : "bg-gray-100 text-gray-600"
            } hover:scale-110 transition-all duration-200`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default MainNavigation;
