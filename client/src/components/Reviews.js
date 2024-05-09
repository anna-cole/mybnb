// import ReviewForm from "./ReviewForm";

const Reviews = ({ submitNewReview, reviews, property }) => {

  console.log(reviews)
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
      <h3>Add a review for this property</h3>
      {/* <ReviewForm pro={pro} submitNewReview={submitNewReview}/> */}
    </div>
  )
}

export default Reviews

