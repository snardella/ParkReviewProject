import React from "react";

const ReviewTile = (props) => {
  const deleteReviewHandler = () => {
    props.deleteReview(props.review);
  };
  return (
    <div>
      <h4>user email: {props.review.user.email}</h4>
      <h5>Submitted Rating: {props.review.rating}</h5>
      <div className="button-group">
        <input className="button" value="Delete" onClick={deleteReviewHandler} />
      </div>
      <label>
        <input className="button" value="Edit" />
      </label>
      <p>{props.review.comments}</p>
    </div>
  );
};

export default ReviewTile;
