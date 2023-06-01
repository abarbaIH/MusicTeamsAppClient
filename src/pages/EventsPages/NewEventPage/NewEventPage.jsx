import { Container } from "react-bootstrap"
import NewEventForm from './../../../components/NewEventForm/NewEventForm'
import { useNavigate, useSearchParams } from "react-router-dom"

const NewEventPage = () => {

    const [searchParams] = useSearchParams();

    const venueId = searchParams.get('venue_id')

    const navigate = useNavigate()

    const redirectUser = () => navigate('/eventos-abiertos')

    return (

        <Container>
            <h1>Nuevo Evento</h1>
            <hr />
            <NewEventForm fireFinalActions={redirectUser} venueId={venueId} />
        </Container>

    )
}

export default NewEventPage



