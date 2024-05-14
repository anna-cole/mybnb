import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import SearchProperty from "./SearchProperty";
import PropertyCard from './PropertyCard';


const Properties = ({ properties }) => {
  const [search, setSearch] = useState('');
  const { currentUser } = useContext(UserContext);

  const propertiesToDisplay = properties.filter(property => property.title.toLowerCase().includes(search.toLowerCase()) || property.location.toLowerCase().includes(search.toLowerCase()))

  if (!currentUser) return <h2>Please login to view properties</h2>;

  return (
    <div className="app">
      <p>{propertiesToDisplay.length} properties based on your criteria.<br />
      Narrow down your search by title or location.</p>
      <SearchProperty onChangeText={e => setSearch(e.target.value)} search={search} />
      <ul className="cards">
        {propertiesToDisplay.map(property => 
        <PropertyCard key={property.id} property={property} />)}
      </ul>
    </div>
  )
}

export default Properties


