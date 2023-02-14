import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
// /reviews/:courtId
export const createReview = (courtId, newReview) => {
    return axios({
        url: `${apiUrl}/reviews/${courtId}`,
        method: 'POST',
        data: { review: newReview }
    })
}

// UPDATE
// /reviews/:courtId/:reviewId
export const updateReview = (user, courtId, updatedReview) => {
    return axios({
        url: `${apiUrl}/reviews/${courtId}/${updatedReview._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { review: updatedReview }
    })
}

// DELETE
// /reviews/:courtId/:reviewId
export const deleteReview = (user, courtId, reviewId) => {
    // console.log('this the reviewId', reviewId)
    return axios({
        url: `${apiUrl}/reviews/${courtId}/${reviewId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}
