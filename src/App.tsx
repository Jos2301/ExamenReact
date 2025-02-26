// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import EmployeesPage from './pages/EmployeesPage';
import UploadPage from './pages/UploadPage';
import Header from './components/Header';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/employees" : "/login"} />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/employees" /> : <LoginPage />} />
        <Route path="/employees" element={isAuthenticated ? <EmployeesPage /> : <Navigate to="/login" />} />
        <Route path="/upload" element={isAuthenticated ? <UploadPage /> : <Navigate to="/login" />} />
        {/* Si la ruta no existe: redirige a HOME o a Employees según la sesión */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/employees" : "/"} />} />
      </Routes>
    </>
  );
};

export default App;
