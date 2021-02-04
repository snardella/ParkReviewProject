import React from "react";
import { Link } from "react-router-dom";
import style from "../../assets/scss/main.scss"

const ParkTile = (props) => {
  const { id, name, location, description, picture } = props.parkData;
  const averageRating = props.parkData.averageRating;
  return (

    <div className="grid-container">
      <div className="grid-x align-center">
        <div className="cell small-8">
          <img className="tile-image" src={picture} />
          <Link to={`/parks/${id}`}>
            <h2 className="park-show-title">{name}</h2>
          </Link>
          <h4 className="park-show-location">{location}</h4>
          <p className="park-tile-description">Average rating:    {averageRating}</p>
        </div>
      </div>
    </div>

  );
};

export default ParkTile;
