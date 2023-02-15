import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteReview } from '../../api/reviews'
import EditReviewModal from './EditReviewModal'

const ShowReview = (props) => {
    const { review, user, court, msgAlert, triggerRefresh } = props

    // here's our hook to display the EditreviewModal
    const [editModalShow, setEditModalShow] = useState(false)
    // console.log('this is the review in showreview', review)
    // here, we're going to use react styling objects to our advantage
    // this will look at the review's condition, and change the background color
    // we'll also use this to set a consistent width for each card
    // we'll pass the results of this function to a style prop in our card
    const setBgCondition = (cond) => {
        if (cond === 'new') {
            return({width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'used') {
            return({width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return({width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    const destroyReview = () => {
        // this is the api call file function
        // it requires three args, user, courtId, & reviewId
        deleteReview(user, court._id, review._id)
            // upon success, we want to send a message
            .then(() => {
                msgAlert({
                    heading: 'Review Deleted',
                    message: 'Bye Bye review!',
                    variant: 'success'
                })
            })
            // then trigger a refresh of the parent component
            .then(() => triggerRefresh())
            // upon failure send an appropriate message
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }
    console.log('review User:', review.owner)
    console.log('user id:', user._id)
    return (
        <>
            <Card className="m-2" style={setBgCondition(review.condition)}>
                <Card.Header>{review.name}</Card.Header>
                <Card.Body>
                    <small>{review.note}</small>
                </Card.Body>
                <Card.Footer>
                    {
                        user._id === review.owner
                        ?
                        <>
                            <Button
                                onClick={() => setEditModalShow(true)}
                                variant="warning"
                                className="m-2"
                            >
                                Edit Review
                            </Button>
                            <Button 
                                onClick={() => destroyReview()} 
                                variant="danger"
                                className="m-2"
                            >
                                Delete Review
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditReviewModal
                user={user}
                court={court}
                review={review}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowReview