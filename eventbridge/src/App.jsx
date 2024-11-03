import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/routes";  // Import routes
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; // Import ProtectedRoute
import Login from "./components/Login/Login";
import Register from "./components/Register/Register"; // Import Register component
import ForgotPassword from "./components/ForgotPassword/ForgotPassword"; // Import ForgotPassword component

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element, protected: isProtected }, index) => (
          <Route
            key={index}
            path={path}
            element={
              isProtected ? (
                <ProtectedRoute>{element}</ProtectedRoute> // Wrap protected routes
              ) : (
                element
              )
            }
          />
        ))}

        {/* Default route to redirect to /login */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Route for Register */}
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Route for Forgot Password */}
      </Routes>
    </Router>
  );
}

export default App;