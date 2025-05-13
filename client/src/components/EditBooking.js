import { useFormik } from "formik";
import * as yup from "yup";

const EditBooking = ({ booking, handleUpdate }) => {

  const formSchema = yup.object().shape({
    check_in: yup.date().required("Must enter a date"),
    check_out: yup.date().required("Must enter a date"),
  });

  const formik = useFormik({
    initialValues: {
      check_in: booking.check_in,
      check_out: booking.check_out,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      // console.log("Booking before fetch:", values);
      fetch(`${process.env.REACT_APP_API_URL}/bookings/${booking.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then(r => {
        if (r.ok) {
          r.json().then(updatedBookingObj => {
            handleUpdate(updatedBookingObj)
            // console.log("Booking after fetch:", updatedBookingObj);
          })
        } 
      })
    }
  })

  return (
    <div className="app">
      <div className="container">
        <div className="booking-box">
          <form onSubmit={formik.handleSubmit} >
            <label htmlFor="check-in-date" className="label-booking">Check-in Date:</label>
            <input 
              type="date" 
              name="check_in" 
              onChange={formik.handleChange} 
              value={formik.values.check_in} 
            />
            <p style={{ color: "red" }}> {formik.errors.check_in}</p>
            <label htmlFor="check-out-date" className="label-booking">Check-out Date:</label>
            <input 
              type="date" 
              name="check_out" 
              onChange={formik.handleChange} 
              value={formik.values.check_out} 
            />
            <p style={{ color: "red" }}> {formik.errors.check_out}</p>
            <button type="submit" className="submit-button">Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditBooking
