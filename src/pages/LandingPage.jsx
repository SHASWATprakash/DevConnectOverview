import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../contexts/ThemeContext"; // Import useTheme

const LandingPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // Use the useTheme hook

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 font-sans">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md focus:outline-none z-10"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9 0 008.354-5.646z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </button>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 drop-shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
        >
          DevConnect
        </motion.h1>
         <motion.p
          className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Connect, Create, Collaborate
        </motion.p>
        <motion.p
          className="text-lg md:text-xl mb-10 max-w-2xl backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Your hub to meet fellow developers, showcase your innovative projects, and receive constructive feedback to elevate your skills and ideas.
        </motion.p>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <motion.button
            onClick={() => navigate("/login")}
            className="relative px-8 py-3 rounded-full text-lg font-semibold text-white overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 transition-all ease-out duration-300 group-hover:from-blue-700 group-hover:to-blue-900"></span>
            <span className="relative">Login</span>
          </motion.button>
          <motion.button
            onClick={() => navigate("/signup")}
            className="relative px-8 py-3 rounded-full text-lg font-semibold text-white overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
             <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-700 dark:to-green-900 transition-all ease-out duration-300 group-hover:from-green-700 group-hover:to-green-900"></span>
            <span className="relative">Sign Up</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
