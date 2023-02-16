import { useState, useCallback } from 'react'
import { createCourt } from '../../api/courts'
import { createCourtSuccess, createCourtFailure } from '../shared/AutoDismissAlert/messages'
import CourtForm from '../shared/CourtForm'

// bring in the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom'

const CreateCourt = (props) => {
    // pull out our props
    const { user, msgAlert } = props
    // set up(pull our navigate function from useNavigate)
    const navigate = useNavigate()
    console.log('this is navigate', navigate)

    const [court, setCourt] = useState({
        name:'',
        location:'',
        // picture:'',
        latitude: '',
        longitude: '',
        nets: true,
        isIndoor: false,
        hasLight: false,
        cost:'',
        hours:'',
        surface:'blacktop/asphalt',
        numberOfHoops:'',
        numberOfCourts:'',
        typeOfRims:'single'
        }
    )
    
    const token = process.env.REACT_APP_MAPBOX_TOKEN

    const handleRetrieve = useCallback(
        (res) => {
          console.log('these are res features',res.features)
          const feature = res.features[0]
          console.log('latitude', feature.geometry.coordinates[0])
          setCourt(prevCourt => {

            const updatedCourt = {
                longitude : feature.geometry.coordinates[0],
                latitude : feature.geometry.coordinates[1]
            }
            

            return {
                ...prevCourt, ...updatedCourt
            }
        })
        }
      )

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

        createCourt(user, court)
            // first we'll nav to the show page
            .then(res => { navigate(`/courts/${res.data.court._id}`)})
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createCourtSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: createCourtFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <CourtForm 
            court={court}
            token={token}
            handleRetrieve={handleRetrieve}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new court!"
        />
    )
}

export default CreateCourt