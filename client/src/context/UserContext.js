import { useState, useEffect, createContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/check_session`, {
      credentials: 'include'
    })
    .then(r => {
      if (r.ok) {
        r.json().then(guest => login(guest))
      }
    })
  }, [])

  const login = guest => {
    setCurrentUser(guest)
    setLoggedIn(true)
  }

  const logout = () => {
    setCurrentUser(null)
    setLoggedIn(false)
  }

  return <UserContext.Provider value={{currentUser, loggedIn, login, logout, error, setError}}>{ children }</UserContext.Provider>;
}

export { UserContext, UserProvider };
