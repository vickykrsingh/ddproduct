import React, { useState, useEffect } from "react";
import { useAddress } from "../context/SetCurrentAddress.jsx";
import axios from "axios";

function GetUserLocationForm() {
  const { currentAddress, setCurrentAddress } = useAddress({});
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState(false);

  const handleInputChange = (fieldName) => (event) => {
    const { value } = event.target;

    // Update the specific field in the formData object
    setCurrentAddress((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    if (locationStatus) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });

            const apiKey = "e0a25fdf275f45ac9ac406a8d9ece33c";
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
                    road,
                  },
                } = firstResult;

                setCurrentAddress({
                  country,
                  postcode,
                  road,
                  state,
                  village,
                  state_district,
                });
              } else {
                setCurrentAddress({ error: "No address found" });
              }
            } catch (error) {
              console.error("Error fetching address:", error);
              setCurrentAddress({ error: "Error fetching address" });
            }
          },
          (error) => {
            console.error("Error getting user's location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by your browser");
      }
    }
  }, [locationStatus]);

  const handleGetLocation = (e) => {
    e.preventDefault();
    setLocationStatus((prev) => !prev);
    if (!locationStatus) {
      setCurrentAddress({});
    }
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md max-w-md ml-auto">
      <div className="space-y-4">
        <div className="form-group">
          <input
            onChange={handleInputChange("postcode")}
            value={currentAddress.postcode}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="PIN Code"
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleInputChange("country")}
            value={currentAddress.country}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Country"
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleInputChange("state")}
            value={currentAddress.state}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Street"
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleInputChange("state_district")}
            value={currentAddress.state_district}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="State"
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleInputChange("village")}
            value={currentAddress.village}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Village"
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleInputChange("road")}
            value={currentAddress.road}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="District"
          />
        </div>
        {!locationStatus && (
          <button
            onClick={handleGetLocation}
            className="w-full py-3 bg-dark text-white rounded-md hover:bg-secondary hover:text-dark transition-all mt-4 focus:outline-none focus:ring-2 focus:ring-dark"
          >
            Get Current Location
          </button>
        )}
      </div>
    </form>
  );
}

export default GetUserLocationForm;
