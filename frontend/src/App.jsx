import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import TradePage from './components/Trade/TradePage';
import PortfolioPage from './components/PortfolioPage';
import AccountPage from './components/AccountPage';
import LoginForm from './components/Authentication/LoginForm';
import NavBar from './components/NavBar';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="container">
        {isLoggedIn && <NavBar setLoggedIn={setLoggedIn} />}
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={<LoginForm setLoggedIn={setLoggedIn} />}
          />
          {isLoggedIn ? (
            <>
              <Route path="/trade" element={<TradePage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/account" element={<AccountPage />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Navigate to="/login"/>} />
              <Route path="/trade" element={<Navigate to="/login"/>} />
              <Route path="/portfolio" element={<Navigate to="/login"/>} />
              <Route path="/account" element={<Navigate to="/login"/>} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;