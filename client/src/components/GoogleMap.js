import React, { useEffect, useState } from 'react';
import {
  GoogleMap as GoogleMapComponent,
  Marker,
  LoadScript
} from '@react-google-maps/api';

interface GoogleMapProps {
  property: {
    location: string;
  };
}

const containerStyle = {
  width: '95%',
  height: '400px',
  position: 'relative' as const
};

const GoogleMap: React.FC<GoogleMapProps> = ({ property }) => {
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!property?.location) return;

    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${property.location}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setMarkerPosition({ lat, lng });
          setLoading(false);
        } else {
          console.log('No results found for the location.');
        }
      } catch (error) {
        console.error('Error fetching geocoding data:', error);
      }
    };

    fetchCoordinates();
  }, [property]);

  if (loading || !markerPosition) {
    return <div>Loading map...</div>;
  }

  return (
    <div>
      <h3>Where you'll be:</h3>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}>
        <GoogleMapComponent
          mapContainerStyle={containerStyle}
          center={markerPosition}
          zoom={14}
        >
          <Marker position={markerPosition} />
        </GoogleMapComponent>
      </LoadScript>
    </div>
  );
};

export default GoogleMap;
