const AddBooking = () => {
  return (
    <div className="app">
      <div className="container">
        <div className="booking-box">
          <form>
            <label htmlFor="check-in-date" className="label-booking">Check-in Date:</label>
            <input type="date" id="check-in-date" name="check-in-date"></input>
            <label htmlFor="check-out-date" className="label-booking">Check-out Date:</label>
            <input type="date" id="check-out-date" name="check-out-date"></input>
            <button type="submit" className="submit-button">Reserve</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddBooking