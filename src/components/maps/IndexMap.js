import "mapbox-gl/dist/mapbox-gl.css"
import Map, { Marker, NavigationControl, Popup, FullscreenControl, GeolocateControl } from "react-map-gl"
import { useState, useCallback, useEffect } from "react"
import LoadingScreen from "../shared/LoadingScreen"
import { Card, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
// import { geocoding } from '@mapbox/mapbox-sdk/services/geocoding'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
// import * as CourtsIndex from "src/components/courts/CourtsIndex.js"

export const IndexMap = (props) => {
const { courts, longit, latit, zoom} = props
const [selectedCourt, setSelectedCourt] = useState(null)
// console.log('these are the courts', courts)
console.log(' this is zoom', zoom)
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
if (!longit || !latit) {
    return <LoadingScreen />
}
    const mapMarkers = courts.map(court => {
        // console.log('this is one court longitude', court.longitude)
        const long = court.longitude.toString()
        const lat = court.latitude.toString()
        return(
            <>
            <Marker key={court._id} longitude={long} latitude={lat}>
            {/* <div className="marker" /> */}
            <button className="marker" onClick={e => {
                e.preventDefault()
                setSelectedCourt(court)
                console.log('this is the selected court', selectedCourt)

            }}>
                <img src="https://www.clipartmax.com/png/small/32-325001_image-basketball-hoop-clipart-png.png" alt="Hoop Icon"/>
            </button>
            </Marker>
            {selectedCourt ? (
                <Popup latitude={selectedCourt.latitude}
                longitude={selectedCourt.longitude}
                style={{ backgroundColor:'#DCB5AE' }}
                onClose={()=>{
                    setSelectedCourt(null)
                }} >
                    <div>
                        <h5>{selectedCourt.name}</h5>
                        <Link style={{position:'relative', float:'right'}}to={`/courts/${selectedCourt._id}`} className="orange-link">View</Link>
                        <p>{selectedCourt.surface}</p>
                        <p>{selectedCourt.numberOfCourts} courts</p>
                        <p>{selectedCourt.numberOfHoops} hoops</p>
                        <img style={{width: '80%'}}src={selectedCourt.picture[0]} />
                    </div>    
                </Popup>
            ): null}
            </>
            )
        })

return (

<>
    <Map
    mapboxAccessToken= {process.env.REACT_APP_MAPBOX_TOKEN}
    style={{ width: "100%", height: "600px",  border: "none"}}
    initialViewState={{ longitude: longit, latitude: latit, zoom: zoom}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    zoom={zoom}
    >
    {mapMarkers}
    <NavigationControl position="bottom-right" />
    <FullscreenControl />
    <GeolocateControl trackUserLocation onGeolocate={handleRetrieve} />
    </Map>
</>
    )
}

export default IndexMap
