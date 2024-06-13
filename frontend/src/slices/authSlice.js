import { createSlice } from "@reduxjs/toolkit";

const getUserInfoFromLocalStorage = () => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Error parsing userInfo from localStorage", error);
    return null;
  }
};

const getAdminInfoFromLocalStorage = () => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    return adminInfo ? JSON.parse(adminInfo) : null;
  } catch (error) {
    console.error("Error parsing adminInfo from localStorage", error);
    return null;
  }
};

const initialState = {
  isAuthenticated: false,
  userInfo: getUserInfoFromLocalStorage(),
  isAdminAuthenticated: false,
  adminInfo: getAdminInfoFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    setAdminCredentials: (state, action) => {
      state.isAdminAuthenticated = true;
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
    adminLogout: (state) => {  
      state.isAdminAuthenticated = false;
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
    },
  },
});

export const { setCredentials, logout, setAdminCredentials, adminLogout } = authSlice.actions;
export default authSlice.reducer;
