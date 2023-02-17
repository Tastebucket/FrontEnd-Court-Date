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
