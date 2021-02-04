import React from "react";
import { Link } from "react-router-dom";

const UserProfile = (props) => {
  let userName = "";
  if (props.user !== undefined && props.user !== null) {
    userName += props.user.email;
  }
  return (
    <div className="callout small-10 small-centered columns" id="user-profile-card">
      <h1 className="centered-text">Parkview profile: {userName}</h1>
      <div>
        <Link to="/parks/new" className="add-new-park">
          Add a new Park!
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
