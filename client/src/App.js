import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Properties from './components/Properties';
import Navbar from './components/Navbar';
import Error from './components/Error';
import Property from './components/Property';
import Bookings from './components/Bookings';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("/check_session")
    .then(r => {
      if (r.ok) {
        r.json().then(guest => login(guest))
      }
    })
  }, [])

  useEffect(() => {
    fetch("/properties")
      .then(resp => resp.json())
      .then(properties => setProperties(properties))
  }, [])

  useEffect(() => {
    fetch("/bookings")
      .then(resp => resp.json())
      .then(bookings => setBookings(bookings))
  }, [])

  const login = guest => {
    setCurrentUser(guest)
    setLoggedIn(true)
  }

  const logout = () => {
    setCurrentUser(null)
    setLoggedIn(false)
  }

  const addBooking = (newBooking) => {
    setBookings([...bookings, newBooking])
  }

  const deleteBooking = id => {
    const updatedBookings = bookings.filter(booking => booking.id !== id)
    setBookings(updatedBookings)
  }

  const updateBooking = updatedBookingObj => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === updatedBookingObj.id) {
        return updatedBookingObj
      } else {
        return booking
      }
    })
    setBookings(updatedBookings)
  }

  return (
    <Router>
      <Navbar logout={logout} loggedIn={loggedIn} />
      <Error />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/signup" element={<Signup login={login} />} />
        <Route path="/properties" element={<Properties properties={properties} currentUser={currentUser}/>} />
        <Route path="/properties/:id" element={<Property addBooking={addBooking} />} />
        <Route path="/bookings" element={<Bookings currentUser={currentUser} bookings={bookings} deleteBooking={deleteBooking} updateBooking={updateBooking} />} />
      </Routes>
    </Router>
  )
}

export default App