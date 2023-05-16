import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './components/HomePage';
import TradePage from './components/TradePage';
import PortfolioPage from './components/PortfolioPage';
import AccountPage from './components/AccountPage';
import LoginForm from './components/LoginForm';
import LogoutPage from './components/LogoutPage';
import NavBar from './components/NavBar';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div className="container">
        {isLoggedIn && <NavBar />}
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={<LoginForm setLoggedIn={setLoggedIn} />}
          />
          {isLoggedIn ? (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route path="/trade" element={<TradePage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/logout" element={<LogoutPage />} />
            </>
          ) : (
            <>
              <Route path="/home" element={<Navigate to="/login"/>} />
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