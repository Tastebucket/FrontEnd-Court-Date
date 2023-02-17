import "mapbox-gl/dist/mapbox-gl.css"
import Map, { Marker, NavigationControl, Popup, FullscreenControl, GeolocateControl } from "react-map-gl"
import { useState, useCallback, useEffect } from "react"
import LoadingScreen from "../shared/LoadingScreen"

// import { geocoding } from '@mapbox/mapbox-sdk/services/geocoding'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
// import * as CourtsIndex from "src/components/courts/CourtsIndex.js"

export const ShowMap = (props) => {
const { court } = props
console.log('these are the courts', court)
const [lng, setLng] = useState(court.longitude)
const [lat, setLat] = useState(court.latitude)
const geolocationAPI = navigator.geolocation

const getUserCoordinates = () => {
    if (!geolocationAPI) {
      console.log('Geolocation API is not available in your browser!')
    } else {
        geolocationAPI.getCurrentPosition((position) => {
            const { coords } = position;
            console.log('this is lat', coords.latitude);
            console.log('this is long', coords.longitude);
          }, (error) => {
            console.log('Something went wrong getting your position!')
          })
        }
}
// const geocoder = geocoding({ accessToken: 'pk.eyJ1Ijoiam9zaHVhaGFycmlzMTEwMyIsImEiOiJjbGU1cTQ5OGUwOWJrM3V0YzlhYml3Znk1In0.RWn3-nWxtA6_obodRSjaXg' })
if (!court) {
    // if no courts loaded yet, display 'loading'
    return <LoadingScreen />
}

return (

<>
    <Map
    mapboxAccessToken= {process.env.REACT_APP_MAPBOX_TOKEN}
    style={{ marginLeft: "5%", justifyContent: "center", width: "90%", height: "250px", borderRadius: "10px", border: "2px solid blue"}}
    initialViewState={{ longitude: lng, latitude: lat, zoom: 12 }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    >
    <Marker longitude={lng.toString()} latitude={lat.toString()}/>
    <NavigationControl position="bottom-right" />
    <GeolocateControl />
    </Map>
</>
    )
}

export default ShowMap
