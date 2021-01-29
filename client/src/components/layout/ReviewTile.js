import React from "react"

const ReviewTile = props => {
  return (
    <div>
      <h4>user email: {props.review.user.email}</h4>
      <h5>Submitted Rating: {props.review.rating}</h5>
      <p>{props.review.comments}</p>
    </div>
  )
}

export default ReviewTile