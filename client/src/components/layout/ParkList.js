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
  }, []);

  const parksListItems = parks.map((parksItem) => {
    return <ParkTile key={parksItem.id} parkData={parksItem} />;
  });

  return (
    <div>
      <div className="top-section">
        <form className="search-form">
        <h2 className="search-title">
          Welcome Traveler
        </h2>
          <input className="search-bar" type="text" placeholder="enter a park name here"/>
          <button className="button" type="submit">
            Search
          </button>
        </form>
      </div>
      

      <div className="row">
          <div className="grid-x align-center">
            <ul className="parklist-column">{parksListItems}</ul>
          </div>
      </div>

    </div>
  );
};

export default ParkList;
