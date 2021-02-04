import React, { useEffect, useState } from "react";
import NewReviewForm from "../NewReviewForm.js";
import ReviewTile from "./ReviewTile.js";
import style from "../../assets/scss/main.scss"

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
        park.reviews.forEach((existingReview) => {
          if (review.id === existingReview.id) {
            let reviewArray = park.reviews;
            reviewArray.splice(reviewArray.indexOf(existingReview), 1);
            setPark({
              ...park,
              reviews: reviewArray,
            });
          }
        });
        let sum = 0;
        park.reviews.forEach((existingReview) => {
          sum += existingReview.rating;
        });
        let average = sum / park.reviews.length;
        setPark({
          ...park,
          averageRating: average,
        });
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
        updateReview={updateReview}
      />
    );
  });

  return (
    <div className="image grid-container small-10 small-centered columns">
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
        <p>{park.description}</p>
      </div>
      <div className="review-comment-box">
        <NewReviewForm parkId={park.id} postReview={postReview} />
        {allTheReviews}
      </div>
    </div>
  );
};

export default ParkShow;
