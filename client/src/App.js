import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { BookingsProvider } from './context/BookingsContext';
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

  useEffect(() => {
    fetch(`/properties`)
      .then(resp => resp.json())
      .then(properties => setProperties(properties))
  }, [])

  return (
    <Router>
      <UserProvider>
        <BookingsProvider>
          <Navbar />
          <Error />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/properties" element={<Properties properties={properties}/>} />
            <Route path="/properties/:id" element={<Property />} />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
        </BookingsProvider>
      </UserProvider>
    </Router>
  )
}

export default App