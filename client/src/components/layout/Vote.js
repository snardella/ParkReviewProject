import React, { useState } from "react";
import ReactDOM from "react-dom";

const Vote = (props) => {
  // Initial state of the component.
  const [vote, setVote] = useState( {
    score: 0,
  });
  
  
  // const checkInput =(arg) => {
  //   return vote === arg ? 0 : arg;
  // }
  // Method to change the state of the component, which the UI reflects "live".
  // const makeVote = (type) => {
  //   const input = checkInput(type)
  //   setState({
  //     vote: type,
  //     score: state.score + type
  //   });
  // }

  const toggleUpvote = async () => {
    setVote(vote => ({
      score: vote.score === 1 ? 0 : 1
    }))
    await props.postVote(vote)
  }

  const toggleDownvote = async () => {
    setVote(vote => ({
      score: vote.score === -1 ? 0 : -1
    }))
    await props.postVote(vote)
  }

  return (
      <main>
        <h1>{vote.score}</h1>
        <button
          id="upvote"
          className={vote.score === 1 ? "active" : undefined}
          onClick={toggleUpvote}
        >
          Upvote
        </button>
        <button
          id="downvote"
          className={vote.score === -1 ? "active" : undefined}
          onClick={toggleDownvote}
        >
          Downvote
        </button>
      </main>
    );
  }

export default Vote