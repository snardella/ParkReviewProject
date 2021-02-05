# ParkReviewProject

- Must create a database with the name ParkReviewProject_development.

## Description:

- This is a park review page which has a parks api incorporated with it.
  You will see a list of National Parks with pictures, descriptions, location. Users can enter a park if they choose to do so. Users can also up-vote or down-vote a park.
  A user can leave a review for a park which can be edited or deleted.
  In order to add a park, add a review or delete a review a user must have an account and be logged in.

## Authors:

- Sam Nardella
- Andrew Magown
- Scott Beckett
- Luis Gaviria.

## Technologies:

-Express.js

- Node.js
- React.js
- Javascript.js
- Passport.js
- PostgreSQL
- Objection.js
- Knex.js
- External NSP API
- Foundation & CSS.

## Features:

- Front and fullstack including:

- Landing Page
- Park List Page

  - Pulls National Parks Services API to create a 3 column row of Parks
  - Each park card will have the name, location, total average rating, and ability to upvote/downvote with a vote total
  - Clicking on Park name will route you to that Park's individual page & details

- Park Show Page

  - Will show the full image paired
  - name, location, rating, & description
  - provides the ability to review and add reviews with rating the park
  - reviews can edited or deleted

- Add a park

* Provides a form to add a park to the park listings, which will show on the Park List Page after submission

# Heroku Link

https://park-review-launch-31.herokuapp.com/
