import React, { useEffect, useState } from "react";
import { Redirect, Route, useParams, withRouter } from "react-router-dom";
import NewReviewForm from "../NewReviewForm.js";
import ReviewTile from "./ReviewTile.js";
import translateServerErrors from "../../services/translateServerErrors.js";

const ParkShow = (props) => {
  const [errors, setErrors] = useState({});
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
      const reviewId = review.id;
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
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
      }
      const body = await response.json();
      setPark({
        ...park,
        reviews: body.reviews,
        averageRating: body.averageRating,
      });
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const updateReview = async (review) => {
    try {
      const reviewId = review.id;
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(review),
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
        debugger;
        setPark({
          ...park,
          reviews: body.park.reviews,
          averageRating: body.park.averageRating,
        });
        setErrors({});
        return;
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  let loggedInUser;
  if (props.user == undefined) {
    loggedInUser = { email: "guest" };
  } else {
    loggedInUser = props.user;
  }

  const allTheReviews = park.reviews.map((review) => {
    return (
      <ReviewTile
        key={review.id}
        review={review}
        deleteReview={deleteReview}
        updateReview={updateReview}
        errors={errors}
        user={loggedInUser.email}
      />
    );
  });

  return (
    <div className="image grid-container small-10 small-centered columns" id="image-container">
      <div className="image grid-container small-10 small-centered columns">
        <img className="showpage-pic" src={park.picture} />
        <aside className="module">
          <h3 className="showpage-title">{park.name}</h3>
          <h5>
            <span>
              <h3 className="title-location">
                {park.location}
                <br />
                Average rating: {park.averageRating}
                <br />
              </h3>
            </span>
          </h5>
          <br></br>
        </aside>
        <p id="park-show-description">{park.description}</p>
      </div>
      <div className="review-comment-box">
        <NewReviewForm parkId={park.id} postReview={postReview} />
        {allTheReviews}
      </div>
    </div>
  );
};

export default withRouter(ParkShow);
