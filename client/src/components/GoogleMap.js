import { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class GoogleMap extends Component {

  state = {
    markerPosition: null,
    mapReady: false, // Flag to indicate if the map is ready for rendering
  };

  componentDidUpdate(prevProps) {
    const { property } = this.props;
    if (property !== prevProps.property) {
      // Fetch the latitude and longitude coordinates for the given city
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${property.location}&key=AIzaSyBcOJPxd1osEuiB_qMd7T-1oYyIiU6MGEc`)
        .then((response) => response.json())
        .then((data) => {
          if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            this.setState({ markerPosition: { lat, lng }, mapReady: true });
          } else {
            console.log('No results found for the city:');
          }
        })
        .catch((error) => {
          console.error('Error fetching geocoding data:', error);
        });
    }
  }

  render() {
    const { markerPosition, mapReady } = this.state;

    if (!mapReady) {
      return <div>Loading map...</div>;
    }

    return (
      <div>
        <h3>Where you'll be:</h3>
        <Map
          google={this.props.google}
          zoom={14}
          style={{ width: '95%', height: '80%', position: 'relative' }}
          initialCenter={markerPosition} // Set the initial center to the marker position
        >
          {markerPosition && (
            <Marker
              onClick={this.onMarkerClick}
              name={'Property position'}
              position={markerPosition}
            />
          )}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBcOJPxd1osEuiB_qMd7T-1oYyIiU6MGEc'
})(GoogleMap);