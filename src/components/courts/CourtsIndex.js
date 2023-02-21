import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import SearchBar from '../shared/SearchBar'

import Rating from '../shared/Rating'
import { dist } from '../shared/Distance'


// api function from our api file
import { getAllCourts } from '../../api/courts'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'
import Mapping from '../../api/map'
import UploadWidget from '../shared/UploadWidget'
import { Row, Col, Container } from 'react-bootstrap'
import DistanceFilter from '../shared/DistanceFilter'


// this is a styling object. they're a quick easy way add focused css properties to our react components
// styling objects use any CSS style, but in camelCase instead of the typical hyphenated naming convention
// this is because we're in js
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}
// CourtsIndex will make a request to the API for all pets
// once it receives a response, display a card for each pet
const CourtsIndex = (props) => {
    const [courts, setCourts] = useState(null)
    const [error, setError] = useState(false)
    const [result, setResult] = useState(null)
    const [display, setDisplay] = useState(null)
    const [zoom, setZoom] = useState(13)
    const [lng, setLng] = useState(null)
    const [lat, setLat] = useState(null)
    const [distanceFilter, setDistanceFilter] = useState(5)

    // console.log('these are the courts in index', courts)
    // pull the message alert (msgAlert) from props
    const { msgAlert } = props
    const geolocationAPI = navigator.geolocation
    
    const setDistance = (e) => {
        const filter = e.target.value
        console.log('this is filter',filter)
        setDistanceFilter(filter)
        // if (filter === 1) {
        //     setZoom(13)
        // } else if (filter == 5) {
        //     setZoom(11)
        // } else if (filter == 25) {
        //     setZoom(9)
        // } else if (filter == 50) {
        //     setZoom(7)
        // } else {
        //     setZoom(4)
        // }

    }
    // get our courts from the api when the component mounts
    useEffect(() => {
        getAllCourts()
            .then(res => setCourts(res.data.courts))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting courts',
                    message: messages.getCourtsFailure,
                    variant: 'danger'
                })
                setError(true)
            })
        getAllCourts()
            .then(res => setDisplay(res.data.courts))
            .catch(err => {
            msgAlert({
                heading: 'Error getting courts',
                message: messages.getCourtsFailure,
                variant: 'danger'
            })
            setError(true)
        })
        geolocationAPI.getCurrentPosition((position) => {
            const { coords } = position;
            console.log('this is lat', coords.latitude);
            console.log('this is long', coords.longitude);
            setLat(coords.latitude)
            setLng(coords.longitude)
        })
        
    }, [])
  
    const onChange = (e) => {
        e.persist()
        setResult(() => {
            // const updatedName = e.target.name
            let value = e.target.value
            // console.log('this is the value',value)
            const filter = display.filter(court => court.name.toLowerCase().includes(value.toLowerCase()))
            // console.log('this is filter',filter)
            
            setCourts(filter)
        })
    
    }

    // if error, display an error
    if (error) {
        return <p>Error!</p>
    }

    if (!courts) {
        // if no courts loaded yet, display 'loading'
        return <LoadingScreen />
    } 
    // else if (courts.length === 0) {

    // } else if (courts.length === 0) {
    //     // otherwise if there ARE no courts, display that message
    //     return (
    //     <div>
    //         <SearchBar 
    //             handleChange={onChange}
    //             // handleDelete={handleDelete}
    //         />
    //         <p>No courts here!</p>
    //     </div>
    //     )
    // }
    let courtCards
    const getCourtDist = () => {
        const courtDist = courts.map(court => {
        const distance = dist(lat, court.latitude, lng, court.longitude)
        return( {
            theCourt: court,
            milesAway: distance
        }
        )
        })
        console.log('these are the court distances', courtDist)
        let courty = courtDist.sort((a,b) => (a.milesAway > b.milesAway) ? 1 : -1)
        console.log('these are the court distances sorted', courty)
        courtCards = courtDist.map(court => {
            const distance = dist(lat, court.theCourt.latitude, lng, court.theCourt.longitude)
            console.log(`${distance} miles away`)
            console.log('this is court.latitude', court.theCourt.latitude)
            console.log('this is the lat from state', lat)
            if (court.milesAway<= distanceFilter) {
                return (
                <Card key={ court.theCourt._id } style={{ width: '100%', margin: 0 }}>
                    <Card.Header style={{ backgroundColor: '#FC9047'}}><h5>{ court.theCourt.name }</h5></Card.Header>
                    <Card.Body>
                        <Card.Text >
                            {court.theCourt.location}
                        </Card.Text>
                        <Card.Text>
                            Court Rating:
                            <Rating />
                        </Card.Text>
                        <Card.Text>
                            { distance.toFixed(2) } Miles Away
                        </Card.Text>
                        {/* <Card.Text> (when ratings are setup)
                            {court.rating}
                        </Card.Text> */}
                        <Card.Text>
                            <Link to={`/courts/${court.theCourt._id}`} className="orange-link">View { court.theCourt.name }</Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
                )
            }
        })
    }
    getCourtDist()
    // once we have an array of courts, loop over them
    // produce one card for every court
    // const courtCards = courts.map(court => {
    //     const distance = dist(lat, court.latitude, lng, court.longitude)
    //     console.log(`${distance} miles away`)
    //     console.log('this is court.latitude', court.latitude)
    //     console.log('this is the lat from state', lat)
    //     return (
    //     <Card key={ court._id } style={{ width: '100%', margin: 0 }}>
    //         <Card.Header style={{ backgroundColor: '#FC9047'}}><h5>{ court.name }</h5></Card.Header>
    //         <Card.Body>
    //             <Card.Text >
    //                 {court.location}
    //             </Card.Text>
    //             <Card.Text>
    //                 Court Rating:
    //                 <Rating />
    //             </Card.Text>
    //             <Card.Text>
    //                 { distance.toFixed(2) } Miles Away
    //             </Card.Text>
    //             {/* <Card.Text> (when ratings are setup)
    //                 {court.rating}
    //             </Card.Text> */}
    //             <Card.Text>
    //                 <Link to={`/courts/${court._id}`} className="orange-link">View { court.name }</Link>
    //             </Card.Text>
    //         </Card.Body>
    //     </Card>
    //     )
    // })
    // console.log('these are the court cards', courtCards)

    // return some jsx
    return (
        <> 
            <div className='container-lg p-4'>
                <SearchBar 
                    handleChange={onChange}
                    // handleDelete={handleDelete}
                />
                <DistanceFilter
                    setDistance={setDistance}
                />
                <Row>
                    <Col className='p-0'>
                        <div className="container-md overflow-auto" style={{ height:'600px'}}>
                            { courtCards }
                        </div>
                    </Col>
                    <Col className='p-0'>
                        <Container fluid="sm" style={{display: "flex", justifyContent: "center"}}>
                            <Mapping courts = {courts} latit={lat} longit={lng} filter={distanceFilter}/>
                        </Container>
                    </Col>
                </Row>
            </div>
        </>
    )
}

// export our component
export default CourtsIndex