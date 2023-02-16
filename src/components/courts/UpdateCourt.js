import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CourtForm from '../shared/CourtForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditCourtModal = (props) => {
    // destructure our props
    console.log(props)
    const { user, show, handleClose, updateCourt, msgAlert, triggerRefresh } = props

    const [court, setCourt] = useState(props.court)

    const onChange = (e) => {
        e.persist()
        
        setCourt(prevCourt => {
            
            const updatedName = e.target.name
            let updatedValue = e.target.value

            console.log('this is the input type', e.target.type)

            // to handle a number, we look at the type, and parse a string to an integer
            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
            if (updatedName === 'nets' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'nets' && !e.target.checked) {
                updatedValue = false
            }
            if (updatedName === 'isIndoor' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isIndoor' && !e.target.checked) {
                updatedValue = false
            }
            if (updatedName === 'hasLight' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'hasLight' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedCourt = {
                [updatedName] : updatedValue
            }
            
            console.log('the court', updatedCourt)

            return {
                ...prevCourt, ...updatedCourt
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        updateCourt(user, court)
            // first we'll nav to the show page
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateCourtSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.updateCourtFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <CourtForm 
                    court={court} 
                    handleChange={onChange} 
                    handleSubmit={onSubmit} 
                    heading="Update Court"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditCourtModal