import React from "react";
import { Link } from "react-router-dom";
import Vote from "./Vote.js";

const ParkTile = (props) => {
  const { id, name, location, description, rating, picture, voteTotal } = props.parkData;
  const averageRating = props.parkData.averageRating;
  return (
    <div className="tile-container">
      <div>
        <div className="park-info-cell">
          <img className="tile-image" src={picture} />
          <Link to={`/parks/${id}`}>
            <div className="park-list-title">
              <h4 className="park-show-title"> {name} </h4>
            </div>
          </Link>
          <h5 className="park-show-location"> {location} </h5>
          <p className="park-tile-average-rating"> Average rating: {averageRating} </p>
          <h5> Votes: {voteTotal} </h5>
          <Vote
            postVote={props.postVote}
            parkId={id}
            user={props.user}
            currentVote={props.currentVote}
          />
        </div>
      </div>
    </div>
  );
};

export default ParkTile;
