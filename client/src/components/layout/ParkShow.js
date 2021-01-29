import React, {useEffect, useState} from "react"

const ParkShow = props => {
  const [park, setPark] = useState({})

  const getPark = async () => {
    const parkId = props.match.params.id;

    try {
      const response = await fetch(`/api/v1/parks/${parkId}`);
      if(!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const body = await response.json();
      setPark(body.park);
    } catch (error) {
      console.error(`Err in fetch: ${error.message}`)
    }
  }
  
  useEffect(() => {
    getPark()
  }, [])

  return (
      <div className="image grid-container small-10 small-centered columns">
        <img className="showpage-pic" src={park.picture}/>
          <aside className="module">
            <h3 className="showpage-title">{park.name}</h3>
            <h3>
              <span>
                {park.location}<br/>
                Average rating: {park.averageRating}<br/>
              </span>
            </h3>
            <br></br>
          </aside>
          <h3 className="description">{park.description}</h3>
      </div>
  )
}

export default ParkShow