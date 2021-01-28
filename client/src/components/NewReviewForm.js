import React, { useState } from "react";
import translateServerErrors from "../services/translateServerErrors.js";
import ErrorList from "./ErrorList.js";

const NewReviewForm = (props) => {
  const [newReview, setNewReview] = useState({
    rating: "",
    comments: "",
  });
  const [errors, setErrors] = useState([]);

  // This post request should live in the park show page.
  const postReview = async (newReviewData) => {
    try {
      const parkId = props.parkId;
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
        console.log("posted successfully", body)
        //const updatedReviews = park.reviews.concat(body.review);
        //setNewReview({ ...park, reviews: updatedReviews });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const handleInputChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postReview(newReview);
    clearForm();
  };

  const clearForm = () => {
    setNewReview({
      rating: "",
      comments: "",
    });
  };

  return (
    <div className="callout">
      <h1>Add a review for this park</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <select name="rating" onChange={handleInputChange} value={newReview.rating}>
            <option value=" "></option>
            <option value="1">1 Star</option>
            <option value="1.5">1.5 Stars</option>
            <option value="2">2 Stars </option>
            <option value="2.5">2.5 Stars </option>
            <option value="3">3 Stars </option>
            <option value="3.5">3.5 Stars </option>
            <option value="4">4 Stars </option>
            <option value="4.5">4.5 Stars </option>
            <option value="5">5 Stars </option>
          </select>
        </label>

        <label>
          Comments:
          <input
            type="text"
            name="comments"
            onChange={handleInputChange}
            value={newReview.comments}
          />
        </label>
        <div>
          <ErrorList errors={errors} />
        </div>

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default NewReviewForm;
