import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../../slices/usersApiSlice";
import { setCredentials } from "../../../slices/authSlice";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [conPasswordError, setConPasswordError] = useState("");
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const validateEmail = (email) => {
    const re =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConPasswordError("");

    let isValid = true;
    if (name.length < 3) {
      setNameError("Name must be at least 3 characters long");
      isValid = false;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    }
    if (password !== conPassword) {
      setConPasswordError("Passwords do not match");
      isValid = false;
    }

    if (isValid) {
      try {
        const userData = await register({ name, email, password });
        dispatch(setCredentials(userData.data));
        // navigate("/")
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400">
            Signup to continue exploring the world
          </p>
        </div>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(""); 
              }}
              className="w-full px-3 py-2 border border-gray-700 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
            {nameError && (
              <p className="text-red-500 text-sm mt-1">{nameError}</p>
            )}
          </div>
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
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(""); 
              }}
              className="w-full px-3 py-2 border border-gray-700 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <div className="mb-4">
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
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(""); 
              }}
              className="w-full px-3 py-2 border border-gray-700 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="conPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="conPassword"
              value={conPassword}
              onChange={(e) => {
                setConPassword(e.target.value);
                setConPasswordError("");
              }}
              className="w-full px-3 py-2 border border-gray-700 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
            {conPasswordError && (
              <p className="text-red-500 text-sm mt-1">{conPasswordError}</p>
            )}
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-cyan-700 text-white py-2 rounded-lg hover:bg-cyan-600 transition duration-300"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
