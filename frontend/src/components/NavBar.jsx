import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './Authentication/LogoutButton';

function NavBar( {setLoggedIn} ) {
  return (
    <nav className="navbar navbar-expand-xl navbar-light bg-light">
      <div className="navbar-nav">
        <Link className="nav-link" to="/trade">Trade</Link>
        <Link className="nav-link" to="/portfolio">Portfolio</Link>
        <Link className="nav-link" to="/account">Account</Link>
        <LogoutButton setLoggedIn={setLoggedIn} />
      </div>
    </nav>
  );
}

export default NavBar;