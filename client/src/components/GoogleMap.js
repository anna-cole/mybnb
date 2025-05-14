import { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '95%',
  height: '400px',
  position: 'relative',
  margin: '0 auto' // Centers the map
};

const GoogleMapComponent = ({ property }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (!property?.location) return;

    const fetchCoordinates = async () => {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${property.location}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setMarkerPosition({ lat, lng });
      }
    };

    fetchCoordinates();
  }, [property]);

  if (!isLoaded || !markerPosition) return <div>Loading map...</div>;

  return (
    <div className="app">
      <h3>Where you'll be:</h3>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={14}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </div>
  );
};

export default GoogleMapComponent;
