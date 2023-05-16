import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from "./components/HomePage";
import TradePage from "./components/TradePage";
import PortfolioPage from "./components/PortfolioPage";
import AccountPage from "./components/AccountPage";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="navbar-nav">
            <Link className="nav-link" to="/home">Home</Link>
            <Link className="nav-link" to="/trade">Trade</Link>
            <Link className="nav-link" to="/portfolio">Portfolio</Link>
            <Link className="nav-link" to="/account">Account</Link>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/logout">Logout</Link>
          </div>
        </nav>
      <Routes>
        <Route exact path="/home" element={<HomePage/>} />
        <Route path="/trade" element={<TradePage/>} />
        <Route path="/portfolio" element={<PortfolioPage/>} />
        <Route path="/account" element={<AccountPage/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/logout" element={<LoginForm/>} />
      </Routes>
    </div>
</Router>
);
}

export default App;