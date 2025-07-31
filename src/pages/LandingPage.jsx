// src/pages/LandingPage.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ParticlesBackground from "../components/ParticlesBackground";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticlesBackground />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 text-blue-700 drop-shadow-lg"
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          Welcome to <span className="text-green-600">DevConnect</span>
        </motion.h1>
        <motion.p
          className="text-gray-700 text-lg mb-8 max-w-xl backdrop-blur-sm bg-white/50 p-4 rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          A platform where developers connect, showcase their projects, and gather feedback to grow together.
        </motion.p>

        <div className="space-x-4">
          <motion.button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
          <motion.button
            onClick={() => navigate("/signup")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
