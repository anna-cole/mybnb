import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import BookingCard from './BookingCard'; 


const Bookings = ({ bookings, deleteBooking, updateBooking }) => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) return <h2>Please login to see your bookings</h2>

  const guestBookings = bookings.filter(booking => booking.guest.name === currentUser.name)

  return (
    <div className="app">
      <h2 className="user-bookings">{currentUser.name}'s trips:</h2>
      {guestBookings.map(booking => <BookingCard key={booking.id} booking={booking} deleteBooking={deleteBooking} updateBooking={updateBooking}/>)}
    </div>
  )
}

export default Bookings