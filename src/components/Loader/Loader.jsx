import { Container, Spinner } from "react-bootstrap"

const Loader = () => {

    return (
        <Container>
            <Spinner animation="border" variant="danger">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>

    )
}

export default Loader