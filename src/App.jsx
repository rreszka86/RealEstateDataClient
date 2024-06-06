import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Index from "./components/Index";
import Main from "./components/Main";
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard onAuth={<Navigate to="/main" />} onNotAuth={<Index />} />
        }
      />
      <Route
        path="/register"
        element={
          <AuthGuard
            onAuth={<Navigate to="/main" />}
            onNotAuth={<Register />}
          />
        }
      />
      <Route
        path="/login"
        element={
          <AuthGuard onAuth={<Navigate to="/main" />} onNotAuth={<Login />} />
        }
      />
      <Route
        path="/main"
        element={
          <AuthGuard onAuth={<Main />} onNotAuth={<Navigate to="/login" />} />
        }
      />
      <Route path="*" element={<Navigate to="/main"/>} />
    </Routes>
  );
}

export default App;
