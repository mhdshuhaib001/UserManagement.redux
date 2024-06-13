import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import userImage from "../../../../public/userImg.jpg"
import { useUpdateProfileMutation } from "../../../slices/usersApiSlice";
import { setCredentials } from "../../../slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || "");
      setEmail(userInfo.email || "");
      setImagePath(
        userInfo.image
          ? `http://localhost:8000/images/${userInfo.image}`
          : userImage 
      );
    }
  }, [userInfo]);
  
  const handleSave = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !image) {
      toast.error("Please fill in all fields!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (name.trim().length < 4) {
      toast.error("Name must be at least 4 characters long!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Invalid email format!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("_id", userInfo._id);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("file", image);
      const data = await updateProfile(formData).unwrap();

      dispatch(setCredentials({ ...data }));
      toast.success("Profile updated successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
      setEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImagePath(URL.createObjectURL(selectedImage));
  };

  const handleCancel = () => {
    setEditing(false);
    setName(userInfo.name); 
    setEmail(userInfo.email); 
    setImage(null); 
    setImagePath(""); 
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <ToastContainer
        toastStyle={{
          backgroundColor: "#333",
          color: "#fff",
          minWidth: "200px",
          textAlign: "center",
        }}
        position="top-center"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <div className="absolute top-0 left-0 p-4">
        <Link to="/" className="text-gray-300 hover:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
        </Link>
      </div>
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold text-center">User Profile</h2>
        </div>
        <div className="mb-6 text-center">
          <img
            src={imagePath}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          {editing && (
            <input
              type="file"
              accept="image/*"
              className="block mx-auto"
              onChange={handleImageChange}
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Name
          </label>
          <input
            value={name}
            type="text"
            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
            onChange={(e) => setName(e.target.value)}
            disabled={!editing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Email
          </label>
          <input
            value={email}
            type="email"
            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
            disabled={!editing}
          />
        </div>
        {!editing ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex justify-between">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-1/2 mr-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 w-1/2 ml-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
