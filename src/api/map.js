import "mapbox-gl/dist/mapbox-gl.css"
import Map, { Marker, NavigationControl, Popup, FullscreenControl, GeolocateControl } from "react-map-gl"
import { useState, useCallback, useEffect } from "react"
import LoadingScreen from "../components/shared/LoadingScreen"

// import { geocoding } from '@mapbox/mapbox-sdk/services/geocoding'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
// import * as CourtsIndex from "src/components/courts/CourtsIndex.js"

export const Mapping = (props) => {
const { courts } = props
console.log('these are the courts', courts)
const [lng, setLng] = useState(-73.769417)
const [lat, setLat] = useState(40.742054)


const handleRetrieve = useCallback(
    (res) => {
      console.log('these are res features',res)
    }
)
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
            <>
            <Marker key={court._id} longitude={long} latitude={lat}>
            <div className="marker" />
            </Marker>
            </>
            )
        })

return (

<>
    <Map
    mapboxAccessToken= {process.env.REACT_APP_MAPBOX_TOKEN}
    style={{ justifyContent: "center", width: "100%", height: "250px" }}
    initialViewState={{ longitude: lng, latitude: lat, zoom: 5 }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    >
    {mapMarkers}
    <NavigationControl position="bottom-right" />
    <FullscreenControl />
    <GeolocateControl trackUserLocation onGeolocate={handleRetrieve} />
    </Map>
</>
    )
}

export default Mapping
