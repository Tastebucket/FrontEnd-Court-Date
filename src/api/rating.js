import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
// /ratings/:courtId
export const createRating = (user, courtId, newRating) => {
    return axios({
        url: `${apiUrl}/ratings/${courtId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { rating: newRating }
    })
}

// UPDATE
// /ratings/:courtId/:ratingId
export const updatedRating = (user, courtId, updatedRating) => {
    return axios({
        url: `${apiUrl}/ratings/${courtId}/${updatedRating._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { rating: updatedRating }
    })
}