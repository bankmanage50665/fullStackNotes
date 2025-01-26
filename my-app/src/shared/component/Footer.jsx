import { Form, useRouteLoaderData, NavLink } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import {
  IoHelpCircleOutline,
  IoLogInOutline,
  IoAddCircleOutline,
  IoLogOutOutline,
} from "react-icons/io5";

export default function Footer() {
  const navItemVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#4F46E5",
      transition: { duration: 0.2 },
    },
  };

  const token = useRouteLoaderData("token");
  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800"
    >
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side navigation */}
          <div className="flex items-center gap-6">
            <motion.div whileHover="hover" variants={navItemVariants}>
              <NavLink
                to="/quizs"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center gap-2"
              >
                <IoHelpCircleOutline className="w-4 h-4" />
                <span>Quizzes</span>
              </NavLink>
            </motion.div>

            {!token && (
              <motion.div whileHover="hover" variants={navItemVariants}>
                <NavLink
                  to="/login"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center gap-2"
                >
                  <IoLogInOutline className="w-4 h-4" />
                  <span>Login</span>
                </NavLink>
              </motion.div>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-6">
            {token && (
              <>
                <motion.div whileHover="hover" variants={buttonVariants}>
                  <NavLink
                    to="/addQuiz"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`
                    }
                  >
                    <IoAddCircleOutline className="w-4 h-4" />
                    <span>Add Quiz</span>
                  </NavLink>
                </motion.div>

                <motion.div whileHover="hover" variants={navItemVariants}>
                  <Form action="/logout" method="post" className="m-0">
                    <button
                      type="submit"
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center gap-2"
                    >
                      <IoLogOutOutline className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </Form>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </nav>
    </motion.footer>
  );
}
