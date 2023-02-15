import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import SearchBar from '../shared/SearchBar'

// api function from our api file
import { getAllCourts } from '../../api/courts'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'

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
    let [courts, setCourts] = useState(null)
    const [error, setError] = useState(false)
    console.log('these are the courts in index', courts)
    // pull the message alert (msgAlert) from props
    const { msgAlert } = props

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
    }, [])
    let result
    useEffect(() => {
        console.log(result)


    }, [result])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        result = courts.filter(court => court === e)
    }


    // if error, display an error
    if (error) {
        return <p>Error!</p>
    }

    if (!courts) {
        // if no courts loaded yet, display 'loading'
        return <LoadingScreen />
    } else if (courts.length === 0) {
        // otherwise if there ARE no courts, display that message
        return <p>No courts yet, go add some!</p>
    }

    // once we have an array of courts, loop over them
    // produce one card for every court
    const courtCards = courts.map(court => (
        <Card key={ court.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ court.name }</Card.Header>
            <Card.Body>
                <Card.Text>
                    {court.location}
                </Card.Text>
                <Card.Text>
                    Number of Courts: {court.numberOfCourts}
                </Card.Text>
                <Card.Text>
                    Number of Hoops: {court.numberOfHoops}
                </Card.Text>
                <Card.Text>
                    <Link to={`/courts/${court._id}`} className="btn btn-info">View { court.name }</Link>
                </Card.Text>
                { court.owner ?
                <Card.Footer>
                     owner: {court.owner.email} 
                </Card.Footer>
                : null}
            </Card.Body>
        </Card>
    ))

    // return some jsx, a container with all the petcards
    return (
        <> 
            <SearchBar 
                courts={courts}
                onSubmit={handleSubmit}
            />
            <div className="container-md" style={ cardContainerStyle }>
                { courtCards }
            </div>
        </>
    )
}

// export our component
export default CourtsIndex