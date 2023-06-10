import React, { useState, createContext} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import TradePage from './components/TradePage';
import PortfolioPage from './components/PortfolioPage';
import AccountPage from './components/AccountPage';
import LoginForm from './components/LoginForm';
import LogoutPage from './components/LogoutButton';
import NavBar from './components/NavBar';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");
  const UserContext = createContext();

  return (
    <Router>
      <div className="container">
        {isLoggedIn && <NavBar />}
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={<LoginForm setLoggedIn={setLoggedIn} setUserID={setUserID} />}
          />
          {isLoggedIn ? (
            <>
              <Route path="/trade" element={<UserContext.Provider value={userID}>
                                              <TradePage />
                                            </UserContext.Provider>} />
              <Route path="/portfolio" element={<UserContext.Provider value={userID}>
                                                  <PortfolioPage />
                                                </UserContext.Provider>} />
              <Route path="/account" element={<UserContext.Provider value={userID}>
                                                <AccountPage />
                                              </UserContext.Provider>} />
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