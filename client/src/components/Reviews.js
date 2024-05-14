const Reviews = ({ reviews }) => {

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
    </div>
  )
}

export default Reviews

