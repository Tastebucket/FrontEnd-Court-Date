import axios from "axios";


/// Reverse Geocoding
export const findLocationName = (long,lat) =>{
    console.log('this is env',process.env)
    return axios(`${process.env.REACT_APP_REVERSE_GEOCODE}/${long},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
}
