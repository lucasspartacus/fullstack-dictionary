import ProtectedRoute from "./components/ProtectedRoute";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register';
import Home from './components/home';
import WordDashboard from "./components/WordDashboard";
import { AuthProvider } from './context/AuthContext';



const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<WordDashboard />} />} />
          </Routes>
      </Router>
      
    </AuthProvider>
  );
};

export default App;
