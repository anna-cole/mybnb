import BookingCard from './BookingCard'; 

const GuestBokings = ({ currentUser, bookings, deleteBooking }) => {

  if (!currentUser) return <h2>Please login to see your bookings</h2>

  const guestBookings = bookings.filter(booking => booking.guest.name === currentUser.name)

  return (
    <div className="app">
      <h2 className="user-bookings">{currentUser.name}'s trips:</h2>
      {guestBookings.map(booking => <BookingCard key={booking.id} booking={booking} deleteBooking={deleteBooking} />)}
    </div>
  )
}

export default GuestBokings