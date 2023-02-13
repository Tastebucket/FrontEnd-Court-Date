import { useState, useEffect } from 'react'
// useParams from react-router-dom allows us to see our route parameters
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneCourt, removeCourt, updateCourt } from '../../api/pets'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditPetModal from './EditPetModal'

// we need to get the pet's id from the route parameters
// then we need to make a request to the api
// when we retrieve a pet from the api, we'll render the data on the screen

const ShowPet = (props) => {
    const [court, setCourt] = useState(null)
    // const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props
    console.log('user in ShowCourt props', user)
    console.log('msgAlert in ShowCourt props', msgAlert)

    useEffect(() => {
        getOneCourt(id)
            .then(res => setCourt(res.data.court))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting courts',
                    message: messages.getCourtsFailure,
                    variant: 'danger'
                })
            })
    }, [updated])

    // here's where our removePet function will be called
    const setCourtFree = () => {
        removeCourt(user, pet.id)
            // upon success, send the appropriate message and redirect users
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeCourtSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            // upon failure, just send a message, no navigation required
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.removeCourtFailure,
                    variant: 'danger'
                })
            })
    }

    if(!court) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="m-2">
                <Card>
                    <Card.Header>{ court.name }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Location: { court.location }</small></div>
                            <div><small>Number of Courts: { court.numberOfCourts }</small></div>
                            <div>
                                <small>
                                    Lights: { pet.hasLight ? 'yes' : 'no' }
                                </small>
                            </div>
                        </Card.Text>
                    </Card.Body>
                    {/* <Card.Footer>
                        {
                            court.owner && user && court.owner._id === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit {pet.name}
                                </Button>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => setPetFree()}
                                >
                                    Set {pet.name} Free
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer> */}
                </Card>
            </Container>
            {/* <EditPetModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updatePet={updatePet}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                pet={pet}
            /> */}
        </>
    )
}

export default ShowPet