import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import SearchBar from '../shared/SearchBar'
<<<<<<< HEAD
// import uploadPicture from './cloudinary/UploadWidget'
=======
import Rating from '../shared/rating'
>>>>>>> d3948547f2aadee06e0e6147dc4e1913714ee6eb

// api function from our api file
import { getAllCourts } from '../../api/courts'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'
import Mapping from '../../api/map'


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

    }, [])
  
    const onChange = (e) => {
        e.persist()
        setResult(() => {
            // const updatedName = e.target.name
            let value = e.target.value
            console.log('this is the value',value)
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
<<<<<<< HEAD
        return <LoadingScreen />
    } 
    // else if (courts.length === 0) {
=======

        return <LoadingScreen /> 

    }
    // } else if (courts.length === 0) {
>>>>>>> d3948547f2aadee06e0e6147dc4e1913714ee6eb
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
<<<<<<< HEAD
=======

>>>>>>> d3948547f2aadee06e0e6147dc4e1913714ee6eb

    // once we have an array of courts, loop over them
    // produce one card for every court
    const courtCards = courts.map(court => (
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
                {/* <Card.Text> (when ratings are setup)
                    {court.rating}
                </Card.Text> */}
                <Card.Text>
                    <Link to={`/courts/${court._id}`} className="btn btn-info">View { court.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    // return some jsx
    return (
        <> 
<<<<<<< HEAD
            <SearchBar handleChange={onChange}/>
            {/* <uploadPicture /> */}
=======
            <Mapping courts = {courts} />
            <SearchBar 
                handleChange={onChange}
                // handleDelete={handleDelete}
            />
>>>>>>> d3948547f2aadee06e0e6147dc4e1913714ee6eb
            <div className="container-md" style={ cardContainerStyle }>
                { courtCards }
            </div>
        </>
    )
}

// export our component
export default CourtsIndex