const GuestBokings = ({ currentUser }) => {
  
  if (!currentUser) return <h2>Loading...</h2>

  const bookings = currentUser.bookings.map(booking => <li key={booking.id}>{booking.check_in}</li>)
  return (
    <div className="app">{bookings}</div>
  )
}

export default GuestBokings