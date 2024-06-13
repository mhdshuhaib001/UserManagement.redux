import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "../../slices/adminApiSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setAdminCredentials } from "../../slices/authSlice";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await adminLogin({ email, password }).unwrap();
      dispatch(setAdminCredentials(data));
      toast.success("Login successful!");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Failed to login: " + (error.data?.message || error.error));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-sm">
        <div className="text-center mb-6">
          <img
            src="/admin-logo.svg"
            alt="Admin App Logo"
            className="h-12 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white">Admin Login</h2>
          <p className="text-gray-400">Login to manage the platform</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-700 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
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
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminLogin;
