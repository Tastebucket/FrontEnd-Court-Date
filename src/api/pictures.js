import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
// /reviews/:courtId
export const createPicture = (user, courtId, newPicture) => {
    console.log('user :', user)
    return axios({
        url: `${apiUrl}/pictures/${courtId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { picture: newPicture }
    })
}

// DELETE
// /reviews/:courtId/:pictureId
export const deletePicture = (user, courtId, pictureId) => {
    // console.log('this the reviewId', reviewId)
    return axios({
        url: `${apiUrl}/pictures/${courtId}/${pictureId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}
