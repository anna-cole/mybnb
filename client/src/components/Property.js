import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Reviews from "./Reviews";
import AddReview from "./AddReview";
import AddBooking from "./AddBooking";
import GoogleMap from "./GoogleMap";

const Property = () => {
  const [property, setProperty] = useState({});
  const [reviews, setReviews] = useState([]);
  const [openForm, setOpenForm] = useState(false); 
  const params = useParams();
  const property_id = params.id

  useEffect(() => {
    fetch(`/properties/${property_id}`)
    .then(r => {
      if (r.ok) {
        r.json().then(property => {
          setProperty(property)
          setReviews(property.reviews)
        })
      }
    })
  }, [property_id])

  const addReview = (newReview) => {
    setOpenForm(false)
    setReviews([...reviews, newReview])
  }

  if (!property) return <h2>Loading...</h2>

  const totalRating = reviews.reduce((accumulator, review) => accumulator + review.rating, 0); 
  const averageRating = (totalRating / reviews.length).toFixed(0);
  const stars = "⭐".repeat(averageRating);
  const image = property.image_url ? property.image_url.substring(1) : null;
  
  return (
    <div className="app">
      <div className="home-container">
        <div className="home-info">
          <h3>{property.title}</h3>
          {/* Mobile image below title */}
          <div className="mobile-image-wrapper">
            <img className="mobile-image" src={image} alt={property.id} width="400" height="300" />
          </div>
          <ul className='property-list'>
            <li>Average rating: {totalRating ? `${averageRating} ${stars}` : null}</li>
            <li>Location: {property.location}</li>
            <li><strong>${property.price}</strong> night</li>
          </ul>
          <Reviews reviews={reviews} />
          <button className="submit-button" onClick={() => setOpenForm(!openForm)}>Add a review</button>
          {openForm ? <AddReview property={property} addReview={addReview} /> : null}
          <AddBooking property={property} />
          <GoogleMap property={property}/>
        </div>
        {/* Desktop image (right side) */}
        <div className="image-wrapper">
          <img className="background-image" src={image} alt={property.id} width="400" height="300" />
        </div>
      </div>
    </div>
  )
}

export default Property
  
 