import { useContext, useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import eventsService from "./../../../services/event.services"
import Loader from "./../../../components/Loader/Loader"
import { AuthContext } from "./../../../contexts/auth.context"
import { formatDate } from './../../../utils/date-format'


const EventDetailsPage = () => {

    const { id } = useParams()
    const [event, setEvent] = useState()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

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

    const handleSubmitAddAssistans = e => {
        e.preventDefault()
        eventsService
            .eventAddAssistants(id, user._id)
            .then(() => navigate('/perfil'))
            .catch(err => console.log(err))
    }

    return (
        <Container>
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
                                <h4><strong>Fecha del Ensayo:</strong></h4>
                                <p>{formatDate(event.eventDate)}</p>

                                <p>Organizado por:
                                    {!event.planner
                                        ?
                                        <Loader />
                                        :
                                        event.planner.firstName
                                    }
                                </p>

                                <h4> <strong>Asistentes al Evento</strong></h4>

                                <ul>
                                    {!event.assistants
                                        ?
                                        <Loader />
                                        :
                                        event.assistants.map(a => {
                                            return (
                                                <li key={a._id}>
                                                    {a.firstName}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>

                                <hr />

                            </Col>
                            <Col md={{ span: 6 }}>
                                <h4><strong>Info de la Sala:</strong></h4>

                                {!event.venueEvent
                                    ?
                                    <Loader />
                                    :
                                    <>
                                        <h5> <strong>Nombre:</strong> </h5> <p>{event.venueEvent.name}</p>
                                        <h5> <strong>Horario de Apertura:</strong> </h5> <p>{event.venueEvent.openingHours}</p>
                                        <h5> <strong>Dirección:</strong> </h5> <p>{event.venueEvent.address}</p>
                                        <h5> <strong>Características: </strong> </h5>

                                        {
                                            event.venueEvent.features.map(feature => {
                                                return (
                                                    <li key={feature}>
                                                        {feature}
                                                    </li>
                                                )

                                            })
                                        }
                                    </>
                                }

                            </Col>
                        </Row>
                        <Row className="mt-4 mb-4">
                            <Col md={{ span: 3 }}>
                                <Link to="/eventos-abiertos">
                                    <Button variant="dark" >Volver al listado</Button>
                                </Link>
                            </Col>

                            <Col md={{ span: 3 }}>
                                <Link to={`/editar-evento/${id}`}>
                                    <Button variant="dark" >Editar Evento</Button>
                                </Link>
                            </Col>

                            <Col md={{ span: 3 }}>
                                <Form onSubmit={handleSubmitAddAssistans}>
                                    <Button variant="dark" type="submit">Apuntarme al Ensayo</Button>
                                </Form>
                            </Col>

                            <Col className="mb-5" md={{ span: 3 }}>
                                <Form onSubmit={handleSubmit}>
                                    <Button variant="danger" type="submit">Eliminar Evento</Button>
                                </Form>
                            </Col>

                        </Row>
                    </>
            }
        </Container>
    )
}

export default EventDetailsPage

