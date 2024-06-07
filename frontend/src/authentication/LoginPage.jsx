import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-sm">
        <div className="text-center mb-6">
          <img
            src="/travel-logo.svg"
            alt="Travel App Logo"
            className="h-12 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400">Login to continue exploring the world</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-700 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-700 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-cyan-700 text-white py-2 rounded-lg hover:bg-cyan-600 transition duration-300"
            >
              Login
            </button>
          </div>
       
        </form>
        <div className="text-center">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot your password?
            </a>
          </div>
          <div className="text-center mt-4">
            <a className="text-slate-100 ">Don't have an account?</a>
            <button onClick={()=> navigate('/signup')} className="ml-2 text-gray-300 hover:underline">
              Sign up
            </button>
          </div>
      </div>
    </div>
  );
};

export default LoginPage;
