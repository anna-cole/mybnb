import { useState, useContext } from "react";
import { BookingsContext } from '../context/BookingsContext';
import EditBooking from "./EditBooking";

const BookingCard = ({ booking }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteBooking, updateBooking } = useContext(BookingsContext);

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
      <button className='booking-button' onClick={handleDelete}>Delete</button>&nbsp;
      <button className='booking-button' onClick={() => setIsEditing(!isEditing)}>Edit</button>
      {isEditing ? (<EditBooking booking={booking} handleUpdate={handleUpdate} />) : null}
    </li>
  </ul>
  )
}

export default BookingCard