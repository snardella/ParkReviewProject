import React from "react"
import { Link } from "react-router-dom"
import Vote from "./Vote.js"

const ParkTile = (props) => {  
  const {id, name, location, description, rating, picture} = props.parkData
  return(
    <div>
      <Link to={`/parks/${id}`}>
        <h3>{name}</h3>
      </Link>
      <img src={picture}/>
      <h5>{location}</h5>
      <p>{description}</p>
      <p>{rating}</p>
      <h5>Score: </h5>
      <Vote 
        postVote={props.postVote} 
        parkId={id}
      />
    </div>
  )
}

export default ParkTile 