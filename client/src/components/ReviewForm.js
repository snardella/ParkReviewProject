import React, { useState } from "react"

const NewReviewForm = ({ postTask }) => {
  const [newReview, setNewReview] = useState({
    rating: "",
    comments: "",
  })


// This post request should live in the park show page.
  const postReview = async (newReviewData) => {
    try {
      const response = await fetch(`/api/v1/parks/${parkId}/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newReviewData),
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
        const body = await response.json();
        const updatedReviews = park.reviews.concat(body.review);
        setNewReview({ ...project, tasks: updatedTasks });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const handleInputChange = event => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postReview(newReview)
    clearForm()
  }

  const clearForm = () => {
    setNewReview({
      name: "",
      description: ""
    })
  }

  return (
    <div className="callout">
      <h1>Add a review for this park</h1>
      <form onSubmit={handleSubmit} >
        <label>
          Rating:
          
          <input
            type="text"
            name="rating"
            onChange={handleInputChange}
            value={newTask.name}
          />
        </label>

        <label>
          Description (Optional):
          <input
            type="text"
            name="description"
            onChange={handleInputChange}
            value={newTask.description}
          />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default NewTaskForm