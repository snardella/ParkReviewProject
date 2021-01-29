import React from "react"
import { Link } from "react-router-dom"

const ParkTile = (props) => {  
  const {id, name, location, description, picture} = props.parkData
  const averageRating = props.parkData.averageRating
  return(
    <div className="callout small-10 small-centered columns">
      <Link to={`/parks/${id}`}>
        <h3>{name}</h3>
      </Link>
      <h4>{location}</h4>
      <img className="tile-image" src={picture}/>
      <h4>{description}</h4>
      <h4>Average rating: {averageRating}</h4>
    </div>
  )
}

export default ParkTile 