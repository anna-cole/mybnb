import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews";
import AddReview from "./AddReview";
import AddBooking from "./AddBooking";

const Property = () => {
  const [property, setProperty] = useState({});
  const [reviews, setReviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false); 
  const params = useParams();
  const property_id = params.id;
 
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
    setIsEditing(false)
    setReviews([...reviews, newReview])
  }
  
  if (!property) return <h2>Loading...</h2>

  const totalRating = reviews.reduce((accumulator, review) => accumulator + review.rating, 0); 
  const averageRating = (totalRating / reviews.length).toFixed(0);
  const stars = "⭐".repeat(averageRating);
  const image = property.image_url ? property.image_url.substring(1) : null;
  
  return (
    <div className="app">
      <h2>{property.title}</h2>
      <img className="background-image" src={image} alt={property.id} width="400" height="300" />
      <ul>
        <li>Average rating: {totalRating ? `${averageRating} ${stars}` : null}</li>
        <li>Location: {property.location}</li>
        <li><strong>${property.price}</strong> night</li>
      </ul>
      <Reviews reviews={reviews} />
      <button className="submit-button" onClick={() => setIsEditing(!isEditing)}>Add a review</button>
      {isEditing ? (<AddReview addReview={addReview} property={property} />) : null}
      <AddBooking property={property} />
    </div>
  )
}

export default Property
  
 