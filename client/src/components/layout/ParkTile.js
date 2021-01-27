import React from "react"
import {BrowserRouter, Route, Link} from "react-router-dom";

const ParkTile = (props) => {  
  const {id, name, location, description, rating, picture} = props.parkData
  return(
      <div>
        <h3>{name}</h3>
        <h5>{location}</h5>
        <p>{description}</p>
        <p>{rating}</p>
        <p>{picture}</p>
      </div>
    )
}

export default ParkTile 