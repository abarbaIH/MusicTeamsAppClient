import { Container } from "react-bootstrap"
import NewVenueForm from "./../../../components/NewVenueForm/NewVenueForm"
import { useNavigate } from "react-router-dom"

const NewVenuePage = () => {

    const navigate = useNavigate()

    const redirectUser = () => navigate('/salas')

    return (
        <Container>
            <h1>NUEVA SALA</h1>
            <hr />
            <NewVenueForm fireFinalActions={redirectUser} />
        </Container>
    )
}

export default NewVenuePage