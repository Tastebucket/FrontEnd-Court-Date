import "mapbox-gl/dist/mapbox-gl.css"
import Map, { Marker, NavigationControl, Popup, FullscreenControl, GeolocateControl } from "react-map-gl"
import { useState } from "react"
import LoadingScreen from "../components/shared/LoadingScreen"
// import { geocoding } from '@mapbox/mapbox-sdk/services/geocoding'
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
// import * as CourtsIndex from "src/components/courts/CourtsIndex.js"

export const Mapping = (props) => {
const { courts } = props
console.log('these are the courts', courts)
const [lng, setLng] = useState(-73.769417)
const [lat, setLat] = useState(40.742054)
// const geocoder = geocoding({ accessToken: 'pk.eyJ1Ijoiam9zaHVhaGFycmlzMTEwMyIsImEiOiJjbGU1cTQ5OGUwOWJrM3V0YzlhYml3Znk1In0.RWn3-nWxtA6_obodRSjaXg' })
if (!courts) {
    // if no courts loaded yet, display 'loading'
    return <LoadingScreen />
}
const mapMarkers = courts.map(court => {
    console.log('this is one court longitude', court.longitude)
    const long = court.longitude.toString()
    const lat = court.latitude.toString()
    return(
    <Marker longitude={long} latitude={lat} 
    />)
})

return (

<>
    <Map
    mapboxAccessToken="pk.eyJ1Ijoiam9zaHVhaGFycmlzMTEwMyIsImEiOiJjbGU1cTQ5OGUwOWJrM3V0YzlhYml3Znk1In0.RWn3-nWxtA6_obodRSjaXg"
    style={{ marginLeft: "5%", justifyContent: "center", width: "90%", height: "250px", borderRadius: "10px", border: "2px solid blue"}}
    initialViewState={{ longitude: lng, latitude: lat, zoom: 13 }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    >
    
    {mapMarkers}
    <NavigationControl position="bottom-right" />
    <FullscreenControl />

    <GeolocateControl />
    </Map>
</>
    )
}

export default Mapping
