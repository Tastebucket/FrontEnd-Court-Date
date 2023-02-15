import { Container, Form, Button } from "react-bootstrap"


const SearchBar = (props) => {
    console.log(props)
    const {handleChange} = props


    return (
        <>
            <Container>
            <Form onChange={handleChange}  >
                <Form.Group className="mb-3">
                    <Form.Label>Search Court</Form.Label>
                    <Form.Control 
                        placeholder="Court name or location"   
                    />
                    <Form.Text className="text-muted">
                    You can filter the court here.
                    </Form.Text>
                </Form.Group>
                
            </Form>
            </Container>
        </>
    )
}

export default SearchBar