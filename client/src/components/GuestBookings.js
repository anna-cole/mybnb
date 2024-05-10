const GuestBokings = ({ currentUser, bookings }) => {

  if (!currentUser) return <h2>Please login to see your bookings</h2>

  const guestBookings = bookings.filter(booking => booking.guest.name === currentUser.name)

  return (
    <div className="app">
      <h2 className="user-bookings">{currentUser.name}'s trips:</h2>
      {guestBookings.map(booking => 
      <ul>
        <li key={booking.id}>
          Check in: {booking.check_in}<br/>
          Check out: {booking.check_out}<br/>
          Accomodation: {booking.property.title}<br/>
          Location: {booking.property.location}<br/>
          <button className="booking-buttons">Delete</button>&nbsp;
          <button className="booking-buttons">Edit</button>
        </li>
      </ul>
      )}
    </div>
  )
}

export default GuestBokings