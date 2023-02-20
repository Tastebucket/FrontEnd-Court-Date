import React, { useEffect, useState } from "react"
import { updateCourt } from "../../api/courts"

const Rating = (props) => {  
  const {user, court} = props
  const [rating, setRating] = useState()
  const [hover, setHover] = useState()
  const [state, setState] = useState(false)
  console.log(rating)
  console.log(court)
  useEffect(()=>{
    setState(true)
  })
  useEffect(()=> {
    if (state === true) {
      court.rating.push(rating)
      console.log('this is court after court.rating.push', court)
      setState(false)
      updateCourt(user, court)
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
            <span className="star">&#9733;</span>
          </button>
        )
      })}
    </div>
  )
}

export default Rating