import React, { useState } from "react";
import ErrorList from "../ErrorList.js";

const ReviewTile = (props) => {
  const [review, setReview] = useState({
    id: props.review.id,
    comments: props.review.comments,
    rating: props.review.rating,
  });

  const deleteReviewHandler = () => {
    props.deleteReview(props.review);
  };

  const saveReview = (event) => {
    event.preventDefault();
    props.updateReview(review);
  };

  const handleInputChange = (event) => {
    if (props.user !== props.review.user.email || props.user == "guest") {
      return console.log("User cant edit");
    }
    event.preventDefault();
    setReview({
      ...review,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  let buttonClassName;
  if (props.user !== props.review.user.email) {
    buttonClassName = "invisible";
  } else {
    buttonClassName = "button-group";
  }

  return (
    <form>
      <ErrorList errors={props.errors} />
      <h4>user email: {props.review.user.email}</h4>
      <select name="rating" onChange={handleInputChange} value={review.rating}>
        <option value=" "></option>
        <option value={1}>1 Star</option>
        <option value={1.5}>1.5 Stars</option>
        <option value={2}>2 Stars </option>
        <option value={2.5}>2.5 Stars </option>
        <option value={3}>3 Stars </option>
        <option value={3.5}>3.5 Stars </option>
        <option value={4}>4 Stars </option>
        <option value={4.5}>4.5 Stars </option>
        <option value={5}>5 Stars </option>
      </select>
      <input type="text" name="comments" value={review.comments} onChange={handleInputChange} />
      <div className={buttonClassName}>
        <input type="button" className="button" value="Delete" onClick={deleteReviewHandler} />
      </div>
      <div className={buttonClassName}>
        <input type="button" className="button" value="Save Edit" onClick={saveReview} />
      </div>
    </form>
  );
};

export default ReviewTile;
