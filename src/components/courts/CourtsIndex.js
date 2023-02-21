import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import SearchBar from '../shared/SearchBar'
import { dist } from '../shared/Distance'
import Rating from '../shared/Rating'


// api function from our api file
import { getAllCourts } from '../../api/courts'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'
import IndexMap from '../maps/IndexMap'
import UploadWidget from '../shared/UploadWidget'
import { Row, Col, Container } from 'react-bootstrap'
import DistanceFilter from '../shared/DistanceFilter'
import { ShowRating } from '../shared/ShowRating'


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
    const [zoom, setZoom] = useState(4)
    const [lng, setLng] = useState(null)
    const [lat, setLat] = useState(null)
    const [distanceFilter, setDistanceFilter] = useState(1000)


    // console.log('these are the courts in index', courts)
    // pull the message alert (msgAlert) from props
    const { user, msgAlert } = props
    const geolocationAPI = navigator.geolocation
    console.log('this is user', user)
    const setDistance = (e) => {
        const filter = e.target.value
        console.log('this is filter',filter)
        setDistanceFilter(filter)
            console.log('on zoom ran')
            if (filter == 1) {
                setZoom(13)
            } else if (filter == 5) {
                setZoom(11)
            } else if (filter == 25) {
                setZoom(9)
            } else if (filter == 50) {
                setZoom(7)
            } else {
                setZoom(4)
            }

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
        let courty = courtDist.sort((a,b) => (a.milesAway > b.milesAway) ? 1 : -1)
        courtCards = courtDist.map(court => {
            const distance = dist(lat, court.theCourt.latitude, lng, court.theCourt.longitude)
            let ratingAverage = 0
            if (court) {
                if (court.theCourt.rating.length > 0) {
                    const numOfRating = court.theCourt.rating.length
                    const ratingArr = court.theCourt.rating.map(rating=> rating.rating)
                    const sumOfRatin = ratingArr.reduce((value, a)=> value + a, 0) 
                    ratingAverage = sumOfRatin/numOfRating
                    console.log('this is the rating average', ratingAverage)
                }
            }
            if (court.milesAway<= distanceFilter) {
                return (
                <Card key={ court.theCourt._id } style={{ width: '100%', margin: 0, borderRadius:'0'}}>
                    <Card.Header style={{ backgroundColor: '#FC9047', borderRadius:'0'}}><h5>{ court.theCourt.name }</h5></Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Text >
                                    {court.theCourt.location}
                                </Card.Text>
                                <Card.Text>
                                    Court Rating:
                                    <ShowRating ratingAverage={ratingAverage}/>
                                </Card.Text>
                                <Card.Text>
                                    { distance.toFixed(2) } Miles Away
                                </Card.Text>
                                {/* <Card.Text> (when ratings are setup)
                                    {court.rating}
                                </Card.Text> */}
                                {user ? (
                                    <Card.Text>
                                        <Link to={`/courts/${court.theCourt._id}`} className="orange-link">View { court.theCourt.name }</Link>
                                    </Card.Text>
                                ): null}
                            </Col>
                            <Col>
                            <Card.Img src={court.theCourt.picture[0]} style={{borderRadius:'5px'}}/>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                )
            }
        })
    }
    getCourtDist()

    return (
        <> 
            <div className='container-lg p-4' style={{height:'90vh'}}>
                <SearchBar 
                    handleChange={onChange}
                    // handleDelete={handleDelete}
                />
                <DistanceFilter 
                    setDistance={setDistance}
                />
                <Row>
                    <Col className='mt-4 p-0'>
                        <div className="container-md overflow-auto" style={{ maxHeight:'600px'}}>
                            { courtCards }
                        </div>
                    </Col>
                    <Col className='mt-4 p-0'>
                        <Container fluid="sm" style={{display: "flex", justifyContent: "center"}}>
                            <IndexMap courts = {courts} latit={lat} longit={lng} zoom={zoom} user={user}/>
                        </Container>
                    </Col>
                </Row>
            </div>
        </>
    )
}

// export our component
export default CourtsIndex