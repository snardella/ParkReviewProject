import React, { useState, useEffect } from "react"
import ParkTile from "./ParkTile.js"

const ParkList = (props) => {
  const [parks, setParks] = useState([])


  const getParks = async () => {
    try {
      const response = await fetch("/api/v1/parks")

      if(!response.ok){
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const body = await response.json()
      setParks(body.parks)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  useEffect(() => {
    getParks()
  }, [])

  const postVote = async (newVoteData) => {

    try {
      const response = await fetch(`/api/v1/votes`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newVoteData)
      })
      if (!response.ok) {
          if(response.status === 422) {
            const body = await response.json()
            const newErrors = translateServerErrors(body.errors)
            return setErrors(newErrors)
          } else {
            const errorMessage = `${response.status} (${response.statusText})`
            const error = new Error(errorMessage)
            throw(error)
          }
        } else {
          const body = await response.json()
          console.log(body)
          // const updatedVotes = species.pets.concat(body.pet)
          // setErrors([])
          // setSpecies({...species, pets: updatedPets})
        }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }


  const parksListItems = parks.map(parksItem => {
    
    return <ParkTile 
        key={parksItem.id} 
        parkData= {parksItem}
        postVote={postVote}
      />
  }) 
  
  return (
    <div>
      <h1>All parks</h1>
        <ul>
          {parksListItems}
        </ul>
    </div>
  )
}

export default ParkList 