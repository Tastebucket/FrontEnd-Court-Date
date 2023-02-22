import axios from "axios";


/// Reverse Geocoding
export const findLocationName = (long,lat) =>{
    console.log('this is env token',process.env.REACT_APP_MAPBOX_TOKEN)
    console.log('this is env api adress', process.env.REACT_APP_REVERSE_GEOCODE)
    return axios(`${process.env.REACT_APP_REVERSE_GEOCODE}/${long},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
}
