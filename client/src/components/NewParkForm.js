import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import translateServerErrors from "../services/translateServerErrors.js";
import FormError from "./layout/FormError.js";

const NewParkForm = (props) => {
  const [newPark, setNewPark] = useState({
    name: "",
    description: "",
    location: "",
    rating: "",
    picture: "",
  });

  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const postPark = async (newParkData) => {
    try {
      const response = await fetch(`/api/v1/parks`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newParkData),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const handleInputChange = (event) => {
    setNewPark({
      ...newPark,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postPark(newPark);
    clearForm();
  };

  const clearForm = () => {
    setNewPark({
      name: "",
      description: "",
      location: "",
      rating: "",
      picture: "",
    });
  };

  if (shouldRedirect) {
    return <Redirect to="/parks" />;
  }

  return (
    <div className="callout" id="park-form-id">
      <h1>Add a Park to this Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
            value={newPark.name}
          />
          <FormError error={errors.name} />
        </label>

        <label>
          Description (Optional):
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleInputChange}
            value={newPark.description}
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleInputChange}
            value={newPark.location}
          />
          <FormError error={errors.location} />
        </label>

        <label>
          Rating:
          <select name="rating" onChange={handleInputChange} value={newPark.rating}>
            <option value=" "></option>
            <option value="1">1 Star</option>
            <option value="1.5">1.5 Stars</option>
            <option value="2">2 Stars </option>
            <option value="2.5">2.5 Stars </option>
            <option value="3">3 Stars </option>
            <option value="3.5">3.5 Stars </option>
            <option value="4">4 Stars </option>
            <option value="4.5">4.5 Stars </option>
            <option value="5">5 Stars </option>
          </select>
          <FormError error={errors.rating} />
        </label>

        <label>
          Picture:
          <input
            type="text"
            name="picture"
            placeholder="Picture"
            onChange={handleInputChange}
            value={newPark.picture}
          />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default NewParkForm;
