import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { BookingsContext } from '../context/BookingsContext';
import BookingCard from './BookingCard'; 

const Bookings = () => {
  const { currentUser } = useContext(UserContext);
  const { bookings } = useContext(BookingsContext);

  if (!currentUser) return <h2>Please login to see your bookings</h2>

  const guestBookings = bookings.filter(booking => booking.guest.name === currentUser.name)

  return (
    <div className="app">
      <h2 className="user-bookings">{currentUser.name}'s trips:</h2>
      {guestBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)}
    </div>
  )
}

export default Bookings