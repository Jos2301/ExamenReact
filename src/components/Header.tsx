import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../assets/Index.css';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Si estamos en la página de login, NO renderizar el header
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <header className={`header-container ${showHeader ? 'visible' : 'hidden'}`}>
      <nav className="nav-container">
        {isAuthenticated ? (
          <>
            <NavLink to="/employees" className="nav-link">
              Employees
            </NavLink>
            <NavLink to="/upload" className="nav-link">
              Upload
            </NavLink>
            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;