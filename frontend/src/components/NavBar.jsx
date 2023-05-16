import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-xl navbar-light bg-light">
      <div className="navbar-nav">
        <Link className="nav-link" to="/home">Home</Link>
        <Link className="nav-link" to="/trade">Trade</Link>
        <Link className="nav-link" to="/portfolio">Portfolio</Link>
        <Link className="nav-link" to="/account">Account</Link>
        <Link className="nav-link" to="/logout">Logout</Link>
      </div>
    </nav>
  );
}

export default NavBar;