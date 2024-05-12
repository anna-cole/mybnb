import AddReview from "./AddReview";

const Reviews = ({ addReview, handleClick, isEditing, reviews, property }) => {

  return (
    <div className="app">
      <h3>Reviews:</h3>
      {reviews.map(review => 
        <ul key={review.id} className="reviews-list">
          <li>Rating: {review.rating} {Array(review.rating).fill("⭐").join("")}</li>
          <li>{review.content}</li>
          <li>Guest: {review.guest.name}</li>
        </ul>
      )}
      <button className="submit-button" onClick={handleClick}>Add a review</button>
      {isEditing ? (
        <AddReview property={property} addReview={addReview} />
      ) : null}
    </div>
  )
}

export default Reviews

