import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import SearchBar from '../shared/SearchBar'
import Rating from '../shared/rating'
import { dist } from '../shared/Distance'

// api function from our api file
import { getAllCourts } from '../../api/courts'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'
import Mapping from '../../api/map'
import UploadWidget from '../shared/UploadWidget'
import { Container } from 'react-bootstrap'


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
    const [lng, setLng] = useState(null)
    const [lat, setLat] = useState(null)

    // console.log('these are the courts in index', courts)
    // pull the message alert (msgAlert) from props
    const { msgAlert } = props
    const geolocationAPI = navigator.geolocation

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

    // once we have an array of courts, loop over them
    // produce one card for every court
    const courtCards = courts.map(court => {
        const distance = dist(lat, court.latitude, lng, court.longitude)
        console.log(`${distance} miles away`)
        console.log('this is court.latitude', court.latitude)
        console.log('this is the lat from state', lat)
        return (
        <Card key={ court._id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ court.name }</Card.Header>
            <Card.Body>
                <Card.Text >
                    {court.location}
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
                    <Link to={`/courts/${court._id}`} className="orange-link">View { court.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
        )
    })

    // return some jsx
    return (
        <> 
            <div className='container-lg p-4'>
                <Container fluid="sm">
                <Mapping courts = {courts} latit={lat} longit={lng} />
                </Container>
                <SearchBar 
                    handleChange={onChange}
                    // handleDelete={handleDelete}
                />
                <div className="container-md" style={ cardContainerStyle }>
                    { courtCards }
                </div>
            </div>
        </>
    )
}

// export our component
export default CourtsIndex