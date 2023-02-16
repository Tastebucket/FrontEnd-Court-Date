// this is where our api calls for the courts resource will live
import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllCourts = () => {
    return axios(`${apiUrl}/courts`)
}

// READ -> Show
export const getOneCourt = (id) => {
    return axios(`${apiUrl}/courts/${id}`)
}

// Create (create a court)
export const createCourt = (user, newCourt) => {
    return axios({
        url: `${apiUrl}/courts`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { court: newCourt }
    })
}

// Update (update a court)
export const updateCourt = (user, updatedCourt) => {
    return axios({
        url: `${apiUrl}/courts/${updatedCourt._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { court: updatedCourt }
    })
}

