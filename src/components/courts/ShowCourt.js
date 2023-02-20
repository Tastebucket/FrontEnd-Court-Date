import { useState, useEffect } from 'react'
// useParams from react-router-dom allows us to see our route parameters
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { getOneCourt, updateCourt } from '../../api/courts'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
// import ReviewForm from '../shared/ReviewForm'
import ShowReview from '../reviews/ShowReview'
import NewReviewModal from '../reviews/NewReviewModal'
import EditCourtModal from './UpdateCourt'
import Mapping from '../../api/map'
import ShowMap from '../maps/ShowMap'
import UploadWidget from '../shared/UploadWidget'



const ShowCourt = (props) => {
    const [court, setCourt] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [createModalShow, setCreateModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    // const navigate = useNavigate()

    const { user, msgAlert } = props
   
    const uploadPhoto =

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


    if(!court) {
        return <LoadingScreen />
    }
    console.log('this is court picture', court.picture[0])
    return (
        <>
            
            <Container className="m-2">
                <Row>
                <Col>
                <Card>
                <Card.Header style={{ backgroundColor: '#FC9047'}}><h5>{ court.name }</h5></Card.Header>

                    <Card.Body>
                            <Row>
                                <Col>
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
                                </Col>
                                <Col>
                                    <Card.Img src={court.picture[0]}/>
                                </Col>
                            </Row>
                    </Card.Body>
                    <Card.Footer>
                        {
                            user ?
                            <>
                            <Button 
                                className='m-2' 
                                onClick={() => setCreateModalShow(true)}>
                                Leave a Review
                            </Button>
                            <Button 
                                className="m-2" variant="warning"
                                onClick={() => setEditModalShow(true)}>
                                Edit {court.name}
                            </Button>
                            <div className='container'>
                                <UploadWidget user={user} msgAlert={msgAlert} court={court} />
                            </div>
                            </>
                            :null
                        }
                    </Card.Footer>
                </Card>
                </Col>
                <Col>
                    <ShowMap court={court} />
                </Col>
                </Row>
            </Container>
          
            <EditCourtModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateCourt={updateCourt}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}

                court={court}
            />

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