import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import "../Navbar.css";


const Navbar = () => {
  const { loggedIn, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = e => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/logout`, {
      method: 'DELETE',
      credentials: 'include' // Support session cookies
    })
    logout();
    navigate("/");
  }

  const displayedLinks = loggedIn ? 
  <>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/logout" onClick={handleLogout}>Logout</NavLink>
    <NavLink to="/properties">Properties</NavLink>
    <NavLink to="/bookings">Your trips</NavLink>
  </> : 
  <>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/signup">Signup</NavLink>
    <NavLink to="/login">Login</NavLink>
  </>
    
  return (
  <div className="app">
    <nav className="navbar">  
      {displayedLinks}
    </nav>
  </div>
  )
}

export default Navbar