import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ReviewForm from '../shared/ReviewForm'
import { createReview } from '../../api/reviews'
import messages from '../shared/AutoDismissAlert/messages'

const NewReviewModal = (props) => {
    const { court, show, handleClose, msgAlert, triggerRefresh, user } = props

    const [review, setReview] = useState({})

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
        createReview(user, court._id, review)
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
                <ReviewForm 
                    review={review}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Give ${court.name} a review!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewReviewModal