import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Properties from './components/Properties';
import Navbar from './components/Navbar';
import Error from './components/Error';
import Property from './components/Property';
import Bookings from './components/Bookings';

const App = () => {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);

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
      <UserProvider>
        <Navbar />
        <Error />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/properties" element={<Properties properties={properties}/>} />
          <Route path="/properties/:id" element={<Property addBooking={addBooking} />} />
          <Route path="/bookings" element={<Bookings bookings={bookings} deleteBooking={deleteBooking} updateBooking={updateBooking} />} />
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App