import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new"> Sign In </Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="profile">
      <Link to="/profile"> Profile Page </Link>
    </li>,
    <li>
      <Link to="/parks/new"> Add a new Park! </Link>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="nav-bar">
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu" id="ul-top-bar">
            <li className="menu-text"></li>
            <li id="nav-link">
              <Link to="/parks">Home</Link>
            </li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu" id="profile-nav-bar">
            {" "}
            {user ? authenticatedListItems : unauthenticatedListItems}{" "}
          </ul>{" "}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
