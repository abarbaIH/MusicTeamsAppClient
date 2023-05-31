import { Container } from "react-bootstrap"
import NewEventForm from './../../../components/NewEventForm/NewEventForm'

const NewEventPage = () => {
    return (

        <Container>
            <h1>Nuevo Evento</h1>
            <hr />
            <NewEventForm />
        </Container>

    )
}

export default NewEventPage

