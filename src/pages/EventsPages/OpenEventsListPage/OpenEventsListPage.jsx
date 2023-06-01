import { useContext, useEffect, useState } from "react"
import { Container, Row, Modal, Button } from "react-bootstrap"
import eventsService from "./../../../services/event.services"
import EventsList from "../../../components/EventsList/EventsList"
import NewEventForm from './../../../components/NewEventForm/NewEventForm'
import Loader from "./../../../components/Loader/Loader"
import { AuthContext } from "./../../../contexts/auth.context"

const OpenEventListPage = () => {

    const [events, setEvents] = useState()
    const [showModal, setShowModal] = useState(false)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadEvents()
    }, [])

    const loadEvents = () => {
        eventsService
            .getOpenEvents()
            .then(({ data }) => setEvents(data))
            .catch(err => console.log(err))
    }

    return (
        <Container>

            <h1>Listado de Eventos</h1>

            {
                user && <Button variant="dark" size="sm" onClick={() => setShowModal(true)}>Crear Evento</Button>
            }

            <hr />
            <Row>
                {
                    !events
                        ?
                        <Loader />
                        :
                        <EventsList events={events} />
                }
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewEventForm fireFinalActions={() => {
                        loadEvents()
                        setShowModal(false)
                    }} />
                </Modal.Body>
            </Modal>

        </Container>
    )
}

export default OpenEventListPage