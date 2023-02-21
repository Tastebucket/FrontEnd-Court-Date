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
import IndexMap from '../maps/IndexMap'
import ShowMap from '../maps/ShowMap'
import UploadWidget from '../shared/UploadWidget'
import Rating from '../shared/Rating'
import { ShowRating } from '../shared/ShowRating'
import PictureModal from '../shared/PictureModal'

const ShowCourt = (props) => {
    const [court, setCourt] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [pictureModalShow, setPictureModalShow] = useState(false)
    const [createModalShow, setCreateModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    // const navigate = useNavigate()

    const { user, msgAlert } = props
   


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
    
    let ratingAverage
    if (court) {
        if (court.rating.length > 0) {
            const numOfRating = court.rating.length
            const ratingArr = court.rating.map(rating=> rating.rating)
            const sumOfRatin = ratingArr.reduce((value, a)=> value + a, 0) 
            ratingAverage = sumOfRatin/numOfRating
        }
    }
    console.log(ratingAverage)
    let reviewCards
    if (court) {
        if (court.review.length > 0) {
            console.log('this is court.review', court.review)
            reviewCards = court.review.map(review => (
                <ShowReview
                    ratingAverage={ratingAverage}
                    // key={review.id} 
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
                <Card style={{ height: '100%'}}>
                <Card.Header style={{ backgroundColor: '#FC9047'}}><h5>{ court.name }</h5></Card.Header>

                    <Card.Body>
                            <Row>
                                
                                    
                                <Card.Text>
                                 
                                    <div>
                                        <h5><ShowRating ratingAverage={ratingAverage}/></h5>
                                    </div>
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
                                            Lights: { court.hasLight ? 'Yes' : 'No' }
                                        </small>
                                    </div>
                                    <div>
                                        <small>
                                            Do the hoops have nets? { court.nets ? 'Yes' : 'No' }
                                        </small>
                                    </div>
                            
                                    <div>
                                        <small>
                                            Indoor: { court.isIndoor ? 'Yes' : 'No'}
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
                                    {/* <div>
                                        <small>
                                            Average rating: <Rating court={court} />
                                        </small>

                                    </div> */}
                                    
                                </Card.Text>
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
                    <div style={{width: '100%'}}>
                    <ShowMap court={court} />
                    <div style={{backgroundImage: `url(${court.picture[0]})`, backgroundSize: "cover", height: "250px", borderRadius:'15px', border: "1px solid #AC5043"}}>
                        <button 
                        className='clear'
                        onClick={() => setPictureModalShow(true)}
                        >
                            View all pictures
                        </button>
                    </div>
                    </div>
                </Col>
                </Row>
            </Container>

                <div className='container'>
                    Reviews: { reviewCards }                    
                </div>

            <EditCourtModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateCourt={updateCourt}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                
                court={court}
                />
            <PictureModal 
                show={pictureModalShow}
                pictures={court.picture}
                handleClose={() => setPictureModalShow(false)}
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