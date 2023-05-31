import { Container } from "react-bootstrap"
import NewVenueForm from "./../../../components/NewVenueForm/NewVenueForm"

const NewVenuePage = () => {

    return (
        <Container>
            <h1>Nueva Sala</h1>
            <hr />
            <NewVenueForm />
        </Container>
    )
}

export default NewVenuePage