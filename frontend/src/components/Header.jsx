import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userImage from "../../public/userImg.jpg"

import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";

const Header = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isAuthenticated = !!userInfo;
  console.log(userInfo, "User info");
  console.log(isAuthenticated, "Is authenticated");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logOut] = useLogoutMutation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      console.log("Attempting to log out");
      await logOut().unwrap();
      dispatch(logout());
      navigate("/login");
      console.log("Logout successful, navigating to login page");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-gray-900 text-white py-5 px-8 md:px-12 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Travel</h1>
        </div>
        <div className="flex items-center justify-center animate-flight">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
          >
            <path
              d="M20 12L4 4l5 8-5 8 16-8z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <a
                href="#"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                Destinations
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                Flights
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                Hotels
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                About
              </a>
            </li>
            {isAuthenticated ? (
              <>
                <li className="relative">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center hover:text-gray-400 transition-colors duration-300 focus:outline-none"
                    >
                      <img
                        src={
                          userInfo.image
                            ? `http://localhost:8000/images/${userInfo.image}`
                            : userImage
                        }
                        alt="User Avatar"
                        className="h-8 w-8 rounded-full mr-2"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 9.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="absolute right-0 z-10 mt-2 w-36 bg-white rounded-md shadow-lg py-1">
                        <div className="px-2 py-1 text-sm text-gray-800 font-semibold border-b">
                          Hello, {userInfo.name}
                        </div>
                        <button
                          onClick={() => navigate("/profile")}
                          className="block w-full text-left px-2 py-1 text-sm text-gray-800 hover:bg-gray-100 focus:outline-none"
                        >
                          Profile
                        </button>
                        <button className="block w-full text-left px-2 py-1 text-sm text-gray-800 hover:bg-gray-100 focus:outline-none">
                          Settings
                        </button>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-2 py-1 text-sm text-gray-800 hover:bg-gray-100 focus:outline-none"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => navigate("/login")}
                  className="hover:text-gray-400 transition-colors duration-300 focus:outline-none"
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
