import React from "react";
import { Link } from "react-router-dom";

const ParkTile = (props) => {
  const { id, name, location, description, picture } = props.parkData;
  const averageRating = props.parkData.averageRating;
  return (
    <div className="callout small-10 small-centered columns">
      <Link to={`/parks/${id}`}>
        <h1 className="park-show-title">{name}</h1>
      </Link>
      <h3 className="park-show-location">{location}</h3>
      <img className="tile-image" src={picture} />
      <aside className="index-description">
        <h4 className="park-tile-description">{description}</h4>
        <h4 className="park-tile-description">Average rating: {averageRating}</h4>
      </aside>
    </div>
  );
};

export default ParkTile;
