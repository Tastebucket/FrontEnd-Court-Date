import { useState } from "react"

export const ShowRating = (props) => {
    const {ratingAverage} = props
    const [rating, setRating] = useState(ratingAverage)
    

    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1
                return (
                    <button
                      type="button"
                      key={index}
                      className= {index <= rating ? "on" : "off"}
                    >
                        <span className="star">&#127936;</span>
                    </button>
                )
            })}
        </div>
    )
}