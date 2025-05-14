import { useState, useEffect, createContext } from 'react';

const BookingsContext = createContext();

const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`/bookings`)
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

  return <BookingsContext.Provider value={{bookings, addBooking, deleteBooking, updateBooking}}>{ children }</BookingsContext.Provider>;
}

export { BookingsContext, BookingsProvider };
