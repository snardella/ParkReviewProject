import React, { useState } from "react";
import ReactDOM from "react-dom";

const Vote = (props) => {
 
  // Initial state of the component.
  const [vote, setVote] = useState( {
    vote: 0,
    parkId: props.parkId
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

  const toggleUpvote = async (event) => {
    event.preventDefault()
    setVote({
      vote: vote + 1,
      parkId: props.parkId,
    })
    await props.postVote(vote)
  }

  const toggleDownvote = async (event) => {
    event.preventDefault()
    setVote({
      vote: vote - 1,
      parkId: props.parkId,
    })
    await props.postVote(vote)
  }
  return (
      <main>
        <button
          id="upvote"
          className={vote.vote === 1 ? "active" : undefined}
          onClick={toggleUpvote}
        >Upvote</button>
        <button
          id="downvote"
          className={vote.vote === -1 ? "active" : undefined}
          onClick={toggleDownvote}
        >Downvote</button>
      </main>
    );
  }

export default Vote