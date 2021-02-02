import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import UserProfile from "./UserProfile";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import NewParkForm from "./NewParkForm";
import ParkList from "./layout/ParkList.js";
import ParkShow from "./layout/ParkShow.js";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

  let greeting = "Welcome to Parkview";
  if (currentUser) {
    greeting += `, ${currentUser.email}`;
  }

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <h2>{greeting}</h2>
        </Route>
        <Route exact path="/parks" component={ParkList} />
        <AuthenticatedRoute exact path="/parks/new" component={NewParkForm} user={currentUser} />
        <Route exact path="/parks/:id" component={ParkShow} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/profile" component={UserProfile} user={currentUser} />
      </Switch>
    </Router>
  );
};

export default hot(App);
