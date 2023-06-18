import React from "react"
import axios from 'axios';

function LogoutButton( {setLoggedIn} ) {
  const handleLogout = async (event) => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      event.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/authentication/logout/');
        console.error(response)
        if (response.status == 200) {
          window.location.href="login"
          setLoggedIn(false)
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <button className="nav-link btn btn-link" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;