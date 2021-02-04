import React, { useState, useRef, useEffect } from "react";

const ReviewTile = (props) => {
  const inputRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [comments, setComments] = useState(props.review.comments);

  const deleteReviewHandler = () => {
    props.deleteReview(props.review);
  };

  function onClickOutSide(e) {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setInputVisible(false);
    }
  }

  useEffect(() => {
    if (inputVisible) {
      document.addEventListener("mousedown", onClickOutSide);
    }

    return () => {
      document.removeEventListener("mousedown", onClickOutSide);
    };
  });

  const saveReview = () => {
    props.review.comments = comments;
    props.updateReview(props.review);
  };

  return (
    <React.Fragment>
    <div className="review-form-reviews">
      <h4>user email: {props.review.user.email}</h4>
      <p>Submitted Rating: {props.review.rating}</p>
      <div>
      {inputVisible ? (
        <input
          ref={inputRef}
          value={comments}
          onChange={(e) => {
            setComments(e.target.value);
          }}
        />
      ) : (
        <div className="comment-text" onClick={() => setInputVisible(true)}>{comments}</div>
      )}
      </div>
      <div className="button-group">
        <input className="button" value="Delete" onClick={deleteReviewHandler} />
        <input className="button" value="Save Edit" onClick={saveReview} />
      </div>
    </div>
    </React.Fragment>
  );
};

export default ReviewTile;
