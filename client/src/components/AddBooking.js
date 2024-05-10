import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";

const AddBooking = ({ property, submitNewBooking }) => {

  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    check_in: yup.date().required("Must enter a date"),
    check_out: yup.date().required("Must enter a date"),
  });

  const formik = useFormik({
    initialValues: {
      check_in: "",
      check_out: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      const bookingData = {
        ...values,
        property_id : property.id, 
      };
      // console.log("Booking before fetch:", bookingData);
      fetch("/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData, null, 2),
      }).then(r => {
        if (r.ok) {
          r.json().then(booking => {
            submitNewBooking(booking)
            navigate("/bookings")
            // console.log("Booking after fetch:", booking);
          })
        } 
      })
      .catch((error) => console.log("Error:", error));
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
            <button type="submit" className="submit-button">Reserve</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddBooking