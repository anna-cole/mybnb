import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className="app">
      <div className="home-container">
        <div className="home-info">
          <img className="logo" src="/logo_house.png" alt="logo" width="100" height="80"/>
          <h1>Welcome to Mybnb!</h1>
          <h2>Find highly rated property rentals for your next trip!</h2>
          <Link to="/login">
            <button type="submit" className="submit-button">Find a property</button>
          </Link>
        </div>
        <img className="background-image" src="/camboinhas.png" alt="camboinhas" width="500" height="300"/>
      </div>
    </div>
  )
}

export default Home