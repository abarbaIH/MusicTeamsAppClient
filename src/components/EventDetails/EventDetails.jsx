import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import eventsService from "../../services/event.services"
import { Row, Col, Button, Form } from "react-bootstrap"
import Loader from "./../../components/Loader/Loader"

const EventDetails = () => {

    const { id } = useParams()
    const [event, setEvent] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        loadEvent()
    }, [])

    const loadEvent = () => {
        eventsService
            .eventDetails(id)
            .then(({ data }) => setEvent(data))
            .catch(err => console.log(err))
    }

    const handleSubmit = e => {
        e.preventDefault()
        eventsService
            .eventDelete(id)
            .then(() => navigate('/eventos-abiertos'))
            .catch(err => console.log(err))
    }

    return (
        <>

            {
                !event
                    ?
                    <Loader />
                    :
                    <>
                        <h1><strong>{event.name}</strong></h1>
                        <hr />
                        <Row>
                            <Col md={{ span: 6 }}>
                                <h4><strong>Estilo Musical</strong></h4>
                                <p>{event.musicStyle}</p>
                                <h4><strong>Experiencia Requerida</strong></h4>
                                <p>{event.requiredExperience}</p>
                                <p>{event.venueEvent}</p>
                                <p>Fecha{event.eventDate}</p>
                                <p>Organizado por {event.planner}</p>
                                <h4> <strong>Asistentes al Evento</strong></h4>
                                <ul>
                                    {event.assistants.map(f => {
                                        return (
                                            <li key={f}>
                                                {f}
                                            </li>
                                        )
                                    })}
                                </ul>

                                <hr />
                                <Row>
                                    <Col md={{ span: 4 }}>
                                        <Link to="/eventos-abiertos">
                                            <Button variant="dark" >Volver al listado</Button>
                                        </Link>
                                    </Col>

                                    <Col md={{ span: 4 }}>
                                        <Link to={`/editar-evento/${id}`}>
                                            <Button variant="dark" >Editar Evento</Button>
                                        </Link>
                                    </Col>

                                    <Col md={{ span: 4 }}>
                                        <Form onSubmit={handleSubmit}>
                                            <Button variant="danger" type="submit">Eliminar Evento</Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </>
            }

        </>
    )

}

export default EventDetails