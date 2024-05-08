import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../Navbar.css";

const Navbar = ({ loggedIn, logout}) => {

  const navigate = useNavigate();

  const handleLogout = e => {
    e.preventDefault();
    fetch('/logout', {
      method: 'DELETE'
    })
    logout();
    navigate("/");
  }

  const displayedLinks = loggedIn ? 
  <>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/logout" onClick={handleLogout}>Logout</NavLink>
    <NavLink to="/properties">Properties</NavLink>
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