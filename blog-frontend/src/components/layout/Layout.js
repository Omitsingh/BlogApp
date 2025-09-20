import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="layout">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <Link to="/">Home</Link>
        </div>
        <div className="header-right">
          {!currentUser ? (
            <>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </>
          ) : (
            <>
              <span>Hello, {currentUser.username}</span>
              <Link to="/profile">Profile</Link>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">{children}</main>

      {/* Footer */}
      <footer className="footer">
        © 2023 Blog App. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
