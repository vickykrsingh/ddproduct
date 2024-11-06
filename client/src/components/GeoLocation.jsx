import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAddress } from '../context/SetCurrentAddress.jsx';

const GeolocationComponent = () => {
  const [location, setLocation] = useState(null);
  const { currentAddress, setCurrentAddress } = useAddress({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Use the OpenCage Geocoding API to get address components from coordinates
          const apiKey = 'e0a25fdf275f45ac9ac406a8d9ece33c';
          const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

          try {
            const response = await axios.get(apiUrl);
            const firstResult = response.data.results[0];

            if (firstResult) {
              const {
                components: {
                  country,
                  state,
                  village,
                  state_district,
                  postcode,
                  city,
                  road,
                },
              } = firstResult;

              setCurrentAddress({
                country,
                postcode,
                city,
                road,
                state,
                village,
                state_district
              });
            } else {
              setCurrentAddress({ error: 'No address found' });
            }
          } catch (error) {
            console.error('Error fetching address:', error);
            setCurrentAddress({ error: 'Error fetching address' });
          }
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Location & Contact Info</h2>
      {location ? (
        <div className="space-y-4">
          {/* Map Embedding */}
          <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${location.latitude},${location.longitude}&zoom=15`}
              allowFullScreen
              title="Google Map of Current Location"
            ></iframe>
          </div>

          {/* Contact Information */}
          <div className="text-lg">
            <p><span className="font-semibold">Name:</span> Your Name</p>
            <p><span className="font-semibold">Email:</span> your.email@example.com</p>
            <p><span className="font-semibold">Phone:</span> +1 234 567 890</p>
          </div>

          {/* Address Information */}
          <div className="mt-4 text-lg">
            <p><span className="font-semibold">Location:</span> {location.latitude}, {location.longitude}</p>
            <p><span className="font-semibold">Country:</span> {currentAddress.country}</p>
            <p><span className="font-semibold">Postal Code:</span> {currentAddress.postcode}</p>
            <p><span className="font-semibold">City:</span> {currentAddress.city}</p>
            <p><span className="font-semibold">Street:</span> {currentAddress.road}</p>
            <p><span className="font-semibold">State:</span> {currentAddress.state}</p>
            <p><span className="font-semibold">Village:</span> {currentAddress.village}</p>
            <p><span className="font-semibold">District:</span> {currentAddress.state_district}</p>
          </div>
        </div>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default GeolocationComponent;
