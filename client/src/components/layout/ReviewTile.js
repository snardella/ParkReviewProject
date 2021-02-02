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
      <h4>user email: {props.review.user.email}</h4>
      <h5>Submitted Rating: {props.review.rating}</h5>
      <div className="button-group">
        <input className="button" value="Delete" onClick={deleteReviewHandler} />
      </div>
      <div className="button-group">
        <input className="button" value="Save Edit" onClick={saveReview} />
      </div>
      {inputVisible ? (
        <input
          ref={inputRef}
          value={comments}
          onChange={(e) => {
            setComments(e.target.value);
          }}
        />
      ) : (
        <span onClick={() => setInputVisible(true)}>{comments}</span>
      )}
    </React.Fragment>
  );
};

export default ReviewTile;
