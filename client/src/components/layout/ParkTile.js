import React from "react"
import { Link } from "react-router-dom"

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
    </div>
  )
}

export default ParkTile 