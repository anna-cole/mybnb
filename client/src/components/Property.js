import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddBooking from "./AddBooking";
import Reviews from "./Reviews";

const Property = ({ submitNewBooking }) => {
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

  const submitNewReview = (newReview) => {
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
      <Reviews submitNewReview={submitNewReview} handleClick={() => setIsEditing(!isEditing)} isEditing={isEditing} reviews={reviews} property={property}/>
      <AddBooking property={property} submitNewBooking={submitNewBooking} />
    </div>
  )
}

export default Property
  
 