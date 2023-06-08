import { useContext, useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import eventsService from "./../../../services/event.services"
import Loader from "./../../../components/Loader/Loader"
import { AuthContext } from "./../../../contexts/auth.context"
import { formatDate } from './../../../utils/date-format'
import './EventDetailsPage.css'


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
        <Container className="bg" >
            {
                !event
                    ?
                    <Loader />
                    :
                    <>
                        <h1><strong>{event.name}</strong></h1>
                        <hr />
                    </>
            }

            <Container className="bg2">

                {
                    !event
                        ?
                        <Loader />
                        :
                        <>

                            <Row>
                                <Col md={{ span: 6 }} className="eventInf">
                                    <h4 className="mb-5"><strong>Información del Ensayo:</strong></h4>
                                    <h5><strong>Estilo musical: </strong></h5><p>{event.musicStyle}</p>
                                    <h5><strong>Experiencia Requerida: </strong></h5>
                                    <p>{event.requiredExperience}</p>
                                    <h5><strong>Fecha del Ensayo:</strong></h5>
                                    <p>{formatDate(event.eventDate)}</p>

                                    <h5><strong>Organizado por:</strong> </h5>
                                    {!event.planner
                                        ?
                                        <Loader />
                                        :

                                        <p>{event.planner.firstName}</p>
                                    }

                                    <h5> <strong>Asistentes al Evento:</strong></h5>

                                    <Row md={{ span: 12 }} >
                                        {!event.assistants
                                            ?
                                            <Loader />
                                            :
                                            event.assistants.map(a => {
                                                return (
                                                    <Col>
                                                        <Link to={`/usuarios/detalles/${a._id}`}>
                                                            <img className="eventAssistants" key={a._id} src={a.avatar} alt="assistants" />
                                                        </Link>
                                                    </Col>

                                                )
                                            })
                                        }
                                    </Row>

                                    <Row className="mt-4">
                                        <Col md={{ span: 3 }}>
                                            <Link to="/eventos-abiertos">
                                                <Button className='eventButton' variant="dark" >Volver al listado</Button>
                                            </Link>
                                        </Col>

                                        {/* <Col md={{ span: 3 }}>
                                            <Link to={`/editar-evento/${id}`}>
                                                <Button className='eventButton' variant="dark" >Editar Ensayo</Button>
                                            </Link>
                                        </Col> */}



                                        {
                                            !user ? <Loader />
                                                :
                                                !event.assistants.includes(user._id)
                                                    ?

                                                    <Col md={{ span: 3 }}>
                                                        <Form onSubmit={handleSubmitAddAssistans}>
                                                            <Button className='eventButton' variant="dark" type="submit">Apuntarme al Ensayo</Button>
                                                        </Form>
                                                    </Col>
                                                    :
                                                    <></>
                                        }



                                        {/* <Col className="mb-5" md={{ span: 3 }}>
                                            <Form onSubmit={handleSubmit}>
                                                <Button className='eventButton' variant="danger" type="submit">Eliminar Ensayo</Button>
                                            </Form>
                                        </Col> */}

                                    </Row>
                                </Col>

                                <Col className="venueInf" md={{ span: 6 }}>
                                    <Row>
                                        <h4 className="mb-5"><strong>Información de la Sala:</strong></h4>

                                        <Col>

                                            {!event.venueEvent
                                                ?
                                                <Loader />
                                                :
                                                <>
                                                    <h5> <strong>Nombre:</strong> </h5> <p>{event.venueEvent.name}</p>
                                                    <h5> <strong>Horario de Apertura:</strong> </h5> <p>{event.venueEvent.openingHours}</p>
                                                    <h5> <strong>Dirección:</strong> </h5> <p>{event.venueEvent.address}</p>
                                                </>
                                            }
                                        </Col>

                                        <Col>


                                            {!event.venueEvent
                                                ?
                                                <Loader />
                                                :
                                                <>

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


                                    <Row className="venueImg">
                                        {!event.venueEvent
                                            ?
                                            <Loader />
                                            :
                                            <>
                                                <Link to={`/salas/detalles/${event.venueEvent._id}`}>

                                                    <img src={event.venueEvent.venueImg} alt="" />

                                                </Link>

                                            </>
                                        }

                                    </Row>
                                </Col>

                            </Row>

                        </>
                }

            </Container>

        </Container >
    )
}

export default EventDetailsPage

