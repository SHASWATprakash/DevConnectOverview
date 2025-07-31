import { Link } from "react-router-dom";
import useSignupFormViewModel from "../hooks/useSignupFormViewModel"; // Import the ViewModel hook
import ThemeToggle from "../ThemeToggle"; // Import ThemeToggle

const SignupForm = () => {
  const { form, loading, error, handleChange, handleSubmit } = useSignupFormViewModel(); // Use the ViewModel hook

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans relative"> {/* Added relative positioning */}
      <div className="absolute top-4 right-4 z-10"> {/* Position ThemeToggle */}
        <ThemeToggle />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full bg-white dark:bg-gray-800 p-10 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Sign Up</h2>
        {error && <p className="text-red-500 dark:text-red-400 text-sm text-center">{error}</p>}
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-700"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-700"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-700"
        />
        <button
          type="submit"
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
         <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 ml-1">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
