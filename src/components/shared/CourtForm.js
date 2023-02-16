// this form will take several props and be used both to create and update courts
// the action will be dependent upon the parent component
// but the form will look the same on both Create and Update
import { Form, Button, Container } from 'react-bootstrap'
import { AddressAutofill } from '@mapbox/search-js-react'


const CourtForm = (props) => {
    // we need several props for a working, reusable form
    // the object itself(court), some handleChange fn, some handleSubmit fn
    // and in this case, we'll add a custom heading
    const { token, handleRetrieve, court, handleChange, handleSubmit, heading } = props
    
    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is the name of the court?"
                        name="name"
                        id="name"
                        value={ court.name }
                        onChange={handleChange}
                        required
                        />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Location:</Form.Label>
                    <AddressAutofill accessToken={token} onRetrieve={handleRetrieve}>
                        <Form.Control 
                            placeholder="Where is this court located?"
                            name="location"
                            id="mapbox-autofill"
                            autoComplete="street-address"
                            value={ court.location }
                            onChange={handleChange}
                            required
                            />
                    </AddressAutofill>
                </Form.Group>
                {/* <Form.Group className="m-2">
                    <Form.Label>Picture:</Form.Label>
                    <Form.Control 
                    type="number"
                    placeholder="Picture"
                    name="age"
                    id="age"
                    value={ court.age }
                    onChange={handleChange}
                    />
                </Form.Group> */}
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Does this court have nets?"
                        name="nets"
                        defaultChecked={ court.nets }
                        onChange={handleChange}
                        />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Does this court have lights?"
                        name="hasLight"
                        defaultChecked={ court.hasLight }
                        onChange={handleChange}
                        />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Is this court indoor?"
                        name="isIndoor"
                        defaultChecked={ court.isIndoor }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Cost:</Form.Label>
                    <Form.Control
                        type="number" 
                        placeholder="Cost of entry"
                        name="cost"
                        min="0"
                        id="cost"
                        value={ court.cost }
                        onChange={handleChange}
                        />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Hours:</Form.Label>
                    <Form.Control
                        placeholder="Hours"
                        name="hours"
                        id="hours"
                        value={ court.hours }
                        onChange={handleChange}
                        />
                    {/* may need to switch to string */}
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Surface:</Form.Label>
                    <Form.Select aria-label="Select a Surface" name="surface"
                        id="surface" onChange={handleChange}>
                        <option value="blacktop/asphalt">Blacktop/Asphalt</option>
                        <option value="hardwood">Hardwood</option>
                        <option value="rubber">Rubber</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Number of Hoops:</Form.Label>
                    <Form.Control
                        type="number" 
                        placeholder="Number of Hoops"
                        min="1"
                        name="numberOfHoops"
                        id="numberOfHoops"
                        value={ court.numberOfHoops }
                        onChange={handleChange}
                        required
                        />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Number of Courts:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Number of Courts"
                        min="1"
                        name="numberOfCourts"
                        id="numberOfCourts"
                        value={ court.numberOfCourts }
                        onChange={handleChange}
                        required
                        />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Type of Rims:</Form.Label>
                    <Form.Select aria-label="Type of Rims" name="typeOfRims"
                        id="typeOfRims" onChange={handleChange}>
                        <option value="single">Single Rim</option>
                        <option value="double">Double Rim</option>
                    </Form.Select>
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}


export default CourtForm