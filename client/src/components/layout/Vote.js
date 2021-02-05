import React, { useState } from "react";

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
        Upvote
      </button>
      <button id="downvote" className={downVoteClass} onClick={toggleDownvote}>
        Downvote
      </button>
    </main>
  );
};

export default Vote;
