import React from "react"
import { Link } from "react-router-dom"

const ParkTile = (props) => {  
  const {id, name, location, description, picture} = props.parkData
  const averageRating = props.parkData.averageRating
  return(
    <div className="callout small-10 small-centered columns">
      <Link to={`/parks/${id}`}>
        <h2>{name}</h2>
      </Link>
      <h3>{location}</h3>
      <img className="tile-image" src={picture}/>
      <aside className="index-description">
        <h3>{description}</h3>
        <h3>Average rating: {averageRating}</h3>
      </aside>

    </div>
  )
}

export default ParkTile 