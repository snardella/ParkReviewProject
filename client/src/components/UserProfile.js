import React from "react"

const UserProfile = (props) => {
  let userName = ""
  if(props.user !== undefined && props.user !== null){
    userName += props.user.email
  }
  return (
    <div>
      <h1>Parkview profile for {userName}</h1>
    </div>
  )
}

export default UserProfile