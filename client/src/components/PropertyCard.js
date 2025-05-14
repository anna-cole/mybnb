import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {

  return (
    <div className="card">
      <img src={property.image_url} alt={property.id}/>
      <li style={{fontWeight: "bold"}}>{property.title}</li>
      <li>Location: {property.location}</li>
      <li><strong>${property.price}</strong> night</li>
      <Link to={`/properties/${property.id}`} className="link">View property</Link><br />
    </div>
  )
}

export default PropertyCard

