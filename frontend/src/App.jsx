import "./App.css";
import UserRoutes from "./Routers/UserRoutes";
import AdminRoutes from "./Routers/AdminRoutes"
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
