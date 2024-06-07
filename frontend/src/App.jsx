import "./App.css";
import UserRoutes from "./Routers/UserRoutes";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
