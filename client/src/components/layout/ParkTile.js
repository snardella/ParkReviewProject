import React from "react"

const ParkTile = ({id, name, location, description, rating, picture}) => {
  return(
    <div>
      <h3>{name}</h3>
      <h5>
        {location}
      </h5>
      <p>
        {description}
      </p>
      <p>
        {rating}
      </p>
      <p>
        {picture}
      </p>
    </div>
  )
}

export default ParkTile 