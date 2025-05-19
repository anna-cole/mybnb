import { useState, useEffect, createContext } from 'react';

const BookingsContext = createContext();

const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`https://mybnb-backend.onrender.com/bookings`, {
          credentials: 'include', // Support session cookies
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch bookings: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched bookings data:", data);
        setBookings(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const addBooking = (newBooking) => {
    setBookings(prev => [...prev, newBooking]);
  };

  const deleteBooking = (id) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
  };

  const updateBooking = (updatedBooking) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === updatedBooking.id ? updatedBooking : booking
      )
    );
  };

  return (
    <BookingsContext.Provider value={{ bookings, addBooking, deleteBooking, updateBooking, loading, error }}>
      {children}
    </BookingsContext.Provider>
  );
};

export { BookingsContext, BookingsProvider };
