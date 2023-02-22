import "mapbox-gl/dist/mapbox-gl.css"
import Map, { Marker, NavigationControl, Popup, FullscreenControl, GeolocateControl } from "react-map-gl"
import { useState, useCallback, useEffect } from "react"
import LoadingScreen from "../shared/LoadingScreen"

export const ShowMap = (props) => {
const { court } = props
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
    style={{ marginBottom: '5%', justifyContent: "center", width: "100%", height: "400px", border: "1px solid #AC5043", borderRadius: "15px" }}
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
