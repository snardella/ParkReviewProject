import React, { useEffect, useState } from "react";
import NewReviewForm from "../NewReviewForm.js";
import ReviewTile from "./ReviewTile.js";

const ParkShow = (props) => {
  const [park, setPark] = useState({
    name: "",
    picture: "",
    location: "",
    description: "",
    rating: "",
    reviews: [],
    averageRating: null,
  });

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

  const postReview = async (newReviewData) => {
    try {
      const parkId = props.match.params.id;
      const response = await fetch(`/api/v1/parks/${parkId}/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newReviewData),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const body = await response.json();
        setPark({
          ...park,
          averageRating: body.park.averageRating,
          reviews: [...park.reviews, body.review],
        });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getPark();
  }, []);

  const deleteReview = async (review) => {
    try {
      const parkId = props.match.params.id;
      const reviewId = review.id;
      const response = await fetch(`/api/v1/parks/${parkId}/reviews/${reviewId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        console.log("deleted...");
        getPark();
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const updateReview = async (review) => {
    try {
      const parkId = props.match.params.id;
      const reviewId = review.id;
      const response = await fetch(`/api/v1/parks/${parkId}/reviews/${reviewId}`, {
        method: "PATCH",
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        console.log("updated...");
        getPark();
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const allTheReviews = park.reviews.map((review) => {
    return (
      <ReviewTile
        key={review.id}
        review={review}
        deleteReview={deleteReview}
        updatedReview={updateReview}
      />
    );
  });

  return (
    <div>
      <h1>{park.name}</h1>
      <img src={park.picture} />
      <h5>{park.location}</h5>
      <p>{park.description}</p>
      <p>Average Rating: {park.averageRating}</p>
      <NewReviewForm parkId={park.id} postReview={postReview} />
      {allTheReviews}
    </div>
  );
};

export default ParkShow;
