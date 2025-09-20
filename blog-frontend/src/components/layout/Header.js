import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container header-container">
        {/* Left side: Home Logo */}
        <Link to="/" className="logo">Home</Link>

        {/* Right side: Navigation */}
        <nav className="nav">
          {!isAuthenticated ? (
            <>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              <Link to="/privacy" className="nav-link">Privacy Policy</Link>
              <Link to="/terms" className="nav-link">Terms of Service</Link>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          ) : (
            <>
              <span className="user-info">Hello, {currentUser?.username}</span>

              {/* Show Users link only if admin */}
              {currentUser?.isAdmin && (
                <Link to="/users" className="nav-link">Users</Link>
              )}

              <Link to="/profile" className="nav-link">Profile</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
