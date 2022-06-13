import { Routes, Route, Navigate } from "react-router-dom";
import { DashBoard, Login, SignUp } from "./page-components";

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="*" element={<Navigate replace to="/dashboard" />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};

