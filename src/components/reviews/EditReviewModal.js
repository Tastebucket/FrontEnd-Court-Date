import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ReviewForm from '../shared/ReviewForm'
import { updateReview } from '../../api/reviews'
import messages from '../shared/AutoDismissAlert/messages'
import Rating from '../shared/Rating'

const EditReviewModal = (props) => {
    const { court, show, handleClose, msgAlert, triggerRefresh, user } = props

    const [review, setReview] = useState(props.review)

    const onChange = (e) => {
        e.persist()
        
        setReview(prevReview => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
            
            const updatedReview = {
                [updatedName] : updatedValue
            }
            
            console.log('the review', updatedReview)
            console.log('the review (state)', review)

            return {
                ...prevReview, ...updatedReview
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        updateReview(user, court._id, review)
            // first we'll close the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createReviewSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.createReviewFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                Court Rating:
                <Rating />
                <ReviewForm 
                    review={review}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Update your review for ${court.name}.`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditReviewModal