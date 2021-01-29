import React, { useEffect, useState } from "react";
import NewReviewForm from "../NewReviewForm.js";
import ReviewTile from "./ReviewTile.js"

const ParkShow = (props) => {
  const [park, setPark] = useState({});
  const [reviews, setReviews] = useState([])

  const getPark = async () => {
    const parkId = props.match.params.id;

    try {
      const response = await fetch(`/api/v1/parks/${parkId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setPark(body.park);
    } catch (error) {
      console.error(`Err in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getPark()
  }, []);

  const allTheReviews = park.reviews.map(review => {
    return (
      <ReviewTile 
        key={review.id}
        review={review}
      />
    )
  })

  return (
    <div>
      <h1>{park.name}</h1>
      <img src={park.picture} />
      <h5>{park.location}</h5>
      <p>{park.description}</p>
      <p>{park.rating}</p>
        {allTheReviews}
      <NewReviewForm 
        parkId={park.id} 
        getReviews={getReviews}
      />
    </div>
  );
};

export default ParkShow;
