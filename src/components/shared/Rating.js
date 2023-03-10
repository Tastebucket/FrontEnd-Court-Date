import React, { useEffect, useState } from "react"
import { updateCourt } from "../../api/courts"
import { createRating } from "../../api/rating"

// need to user and court props from parent
const Rating = (props) => {  
  const {user, court} = props
  const [rating, setRating] = useState()
  const [hover, setHover] = useState()
  const [state, setState] = useState(false)
  useEffect(()=>{
    setState(true)
  })
  useEffect(()=> {
    if (state === true) {
      // court.rating.push(rating)
      const theRating = Number(rating)
      console.log(theRating)
      console.log('this is court after court.rating.push', court)
      setState(false)
      createRating(user, court._id, theRating)
        
    }
  },[rating])
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1
        return (
          <button
            type="button"
            key={index}
            className= {index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#127936;</span>
          </button>
        )
      })}
    </div>
  )
}

export default Rating