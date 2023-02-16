import { useState, useEffect } from 'react'
// useParams from react-router-dom allows us to see our route parameters
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneCourt } from '../../api/courts'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import ReviewForm from '../shared/ReviewForm'
import ShowReview from '../reviews/ShowReview'
import NewReviewModal from '../reviews/NewReviewModal'
// import Mapping from './api/map.js'
// import EditPetModal from './EditPetModal'



const ShowCourt = (props) => {
    const [court, setCourt] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [createModalShow, setCreateModalShow] = useState(false)
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

    let reviewCards
    if (court) {
        if (court.review.length > 0) {
            reviewCards = court.review.map(review => (
                <ShowReview
                    key={review.id} 
                    review={review}
                    user={user}
                    court={court}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    

    const onClick = (e) => {
        
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
                            <div>
                                <small>
                                    Location: { court.location }
                                </small>
                            </div>
                            <div>
                                <small>
                                    Number of hoops: { court.numberOfHoops }
                                </small>
                            </div>
                            <div>
                                <small>
                                    Number of courts: { court.numberOfCourts }
                                </small>
                            </div>
                            <div>
                                <small>
                                    Surface: { court.surface }
                                </small>
                            </div>
                            <div>
                                <small>
                                    Type of rims: { court.typeOfRims }
                                </small>
                            </div>
                            <div>
                                <small>
                                    Lights: { court.hasLight ? 'yes' : 'no' }
                                </small>
                            </div>
                            <div>
                                <small>
                                    Does the hoops have nets? { court.nets ? 'yes' : 'no' }
                                </small>
                            </div>
                    
                            <div>
                                <small>
                                    Indoor: { court.isIndoor ? 'yes' : 'no'}
                                </small>
                            </div>
                            <div>
                                <small>
                                    Cost: { court.cost }
                                </small>
                            </div>
                            <div>
                                <small>
                                    Hours: { court.hours }
                                </small>
                            </div>
                          
                          
                            <div>
                                <small>
                                    Reviews: { reviewCards }
                                </small>
                            </div>
                        </Card.Text>
                        <Button className='m-2' onClick={() => setCreateModalShow(true)}>
                            Leave a Review
                        </Button>
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
             {/* <Mapping /> */}
             <NewReviewModal
                user={user}
                court={court}
                show={createModalShow}
                handleClose={() => setCreateModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default ShowCourt