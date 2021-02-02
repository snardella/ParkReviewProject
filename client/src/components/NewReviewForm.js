import React, { useState } from "react";
import translateServerErrors from "../services/translateServerErrors.js";
import ErrorList from "./ErrorList.js";

const NewReviewForm = (props) => {
  const [errors, setErrors] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: "",
    comments: "",
  });

  const handleInputChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.postReview(newReview);
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
