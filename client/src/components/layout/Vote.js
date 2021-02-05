import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

// const element = <FontAwesomeIcon icon={faCoffee} />;

const Vote = (props) => {
  //debugger
  // Initial state of the component.
  let upVoteClass = undefined;
  let downVoteClass = undefined;

  const toggleUpvote = async (event) => {
    event.preventDefault();
    if (props.currentVote.userId !== props.user.id) {
      await props.postVote({
        vote: 1,
        parkId: props.parkId,
      });
      upVoteClass = "active";
    } else if (props.currentVote.userId === props.user.id && props.currentVote.voteTotal === 1) {
      alert("You cannot vote twice in a row!");
    } else {
      await props.postVote({
        vote: 1,
        parkId: props.parkId,
      });
      upVoteClass = "active";
    }
  };

  const toggleDownvote = async (event) => {
    event.preventDefault();
    if (props.currentVote.userId !== props.user.id) {
      await props.postVote({
        vote: -1,
        parkId: props.parkId,
      });
      downVoteClass = "active";
    } else if (props.currentVote.userId === props.user.id && props.currentVote.voteTotal === -1) {
      alert("You cannot vote twice in a row!");
    } else {
      await props.postVote({
        vote: -1,
        parkId: props.parkId,
      });
      downVoteClass = "active";
    }
  };

  return (
    <main>
      <button id="upvote" className={upVoteClass} onClick={toggleUpvote}>
        <div className="thumbs-up">
          <i class="far fa-thumbs-up fa-3x"></i>
        </div>
      </button>

      <button id="downvote" className={downVoteClass} onClick={toggleDownvote}>
        <div className="thumbs-down">
          <i class="far fa-thumbs-down fa-3x"></i>
        </div>
      </button>
    </main>
  );
};

export default Vote;
