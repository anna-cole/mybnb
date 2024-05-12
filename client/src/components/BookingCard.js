import { useState } from "react";
import EditBooking from "./EditBooking";

const BookingCard = ({ booking, deleteBooking, updateBooking }) => {
  const [isEditing, setIsEditing] = useState(false); 

  const handleDelete = () => {
    fetch(`/bookings/${booking.id}`, {method: "DELETE"})
    deleteBooking(booking.id)
  }

  const handleUpdate = updatedBookingObj => {
    setIsEditing(false)
    updateBooking(updatedBookingObj)
  }
  
  return (
    <ul>
    <li>
      Check in: {booking.check_in}<br/>
      Check out: {booking.check_out}<br/>
      Accomodation: {booking.property.title}<br/>
      Location: {booking.property.location}<br/>
      <button className="booking-buttons" onClick={handleDelete}>Delete</button>&nbsp;
      <button className="booking-buttons" onClick={() => setIsEditing((isEditing) => !isEditing)}>Edit</button>
      {isEditing ? (<EditBooking booking={booking} handleUpdate={handleUpdate} />) : null}
    </li>
  </ul>
  )
}

export default BookingCard