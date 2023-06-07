import { useContext, useEffect, useState } from "react"
import { Container, Row, Modal, Button, Col } from "react-bootstrap"
import eventsService from "./../../../services/event.services"
import EventsList from "../../../components/EventsList/EventsList"
import NewEventForm from './../../../components/NewEventForm/NewEventForm'
import Loader from "./../../../components/Loader/Loader"
import { AuthContext } from "./../../../contexts/auth.context"
import './OpenEventsListPage.css'

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
            <Row>

                <Col>
                    <h1>ENSAYOS ABIERTOS</h1>

                </Col>

                <Col>
                    {
                        user && <Button className="buttonNewEvent" variant="dark" size="sm" onClick={() => setShowModal(true)}>Crear Ensayo</Button>
                    }
                </Col>

            </Row>

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