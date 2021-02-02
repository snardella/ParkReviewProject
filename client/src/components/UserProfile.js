import React from "react"
import { Link } from "react-router-dom"

const UserProfile = (props) => {
  let userName = ""
  if(props.user !== undefined && props.user !== null){
    userName += props.user.email
  }
  return (
    <div>
      <h1>Parkview profile for {userName}</h1>
      <Link to="/parks/new">Add a new Park!</Link>

    </div>
  )
}

export default UserProfile