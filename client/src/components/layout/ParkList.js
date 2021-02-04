import React, { useState, useEffect } from "react";
import ParkTile from "./ParkTile.js";

const ParkList = (props) => {
  const [parks, setParks] = useState([]);

  const getParks = async () => {
    try {
      const response = await fetch("/api/v1/parks");

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setParks(body.parks);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };
  useEffect(() => {
    getParks();
    getNPSParks();
  }, []);

  const getNPSParks = async () => {
    try {
      const response = await fetch(`api/v1/NPS`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const NPSData = await response.json();
      console.log(NPSData);
      NPSData.data.forEach((park) => {
        setParks({
          ...parks,
          name: park.fullName,
          location: park.addresses[0].city,
          description: park.description,
          picture: park.images[0].url,
        });
      });
    } catch (error) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const parksListItems = parks.map((parksItem) => {
    return <ParkTile key={parksItem.id} parkData={parksItem} />;
  });

  return (
    <div>
      <h1>All parks</h1>
      <ul>{parksListItems}</ul>
    </div>
  );
};

export default ParkList;
