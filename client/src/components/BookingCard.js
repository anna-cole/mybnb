const BookingCard = ({ booking, deleteBooking }) => {

  const handleDelete = () => {
    fetch(`/bookings/${booking.id}`, {method: "DELETE"})
    deleteBooking(booking.id)
  }
  
  return (
    <ul>
    <li>
      Check in: {booking.check_in}<br/>
      Check out: {booking.check_out}<br/>
      Accomodation: {booking.property.title}<br/>
      Location: {booking.property.location}<br/>
      <button className="booking-buttons" onClick={handleDelete}>Delete</button>&nbsp;
      <button className="booking-buttons">Edit</button>
    </li>
  </ul>
  )
}

export default BookingCard