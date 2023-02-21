import { Form } from "react-bootstrap"



const DistanceFilter = (props) => {
const {setDistance} = props
    return(
        <div>
            <Form>
            <Form.Group className="m-2">
                <Form.Label>Find court within:</Form.Label>
                    <Form.Select 
                        aria-label="filter-distance"
                        name="distance"
                        defaultValue='5'
                        onChange={setDistance}
                    >
                        <option>Open this select menu</option>
                        <option value="1">1 mile</option>
                        <option value="5">5 miles</option>
                        <option value="25">25 miles</option>
                        <option value="50">50 miles</option>
                        <option value="20000">No Limit</option>
                    </Form.Select>
                </Form.Group>
            </Form>
        </div>
    )
}

export default DistanceFilter