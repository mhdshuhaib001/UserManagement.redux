import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Profile from '../components/Profile/Profile'
import Login from "../authentication/LoginPage";
import Signup from "../authentication/SignupPage";

const UserRoutes = () => {
  return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />


      </Routes>
  );
};

export default UserRoutes;
