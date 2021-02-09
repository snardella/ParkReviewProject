import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const Vote = (props) => {
  let upVoteClass = undefined;
  let downVoteClass = undefined;

  const toggleUpvote = async (event) => {
    event.preventDefault();
    if (props.currentVote.userId !== props.user.id && props.parkId !== props.currentVote.parkId) {
      await props.postVote({
        vote: 1,
        parkId: props.parkId,
      });
      upVoteClass = "active";
    } else if (
      props.currentVote.userId === props.user.id &&
      props.currentVote.voteTotal === 1 &&
      props.parkId === props.currentVote.parkId
    ) {
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
    if (props.currentVote.userId !== props.user.id && props.parkId !== props.currentVote.parkId) {
      await props.postVote({
        vote: -1,
        parkId: props.parkId,
      });
      downVoteClass = "active";
    } else if (
      props.currentVote.userId === props.user.id &&
      props.currentVote.voteTotal === -1 &&
      props.parkId === props.currentVote.parkId
    ) {
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
        <FontAwesomeIcon icon={faThumbsUp} size="3x" />
      </button>

      <button id="downvote" className={downVoteClass} onClick={toggleDownvote}>
        <FontAwesomeIcon icon={faThumbsDown} size="3x" />
      </button>
    </main>
  );
};

export default Vote;
