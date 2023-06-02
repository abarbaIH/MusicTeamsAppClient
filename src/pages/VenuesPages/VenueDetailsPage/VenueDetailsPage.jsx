import { useContext, useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import venuesService from "./../../../services/venues.services"
import Loader from "./../../../components/Loader/Loader"
import usersService from './../../../services/users.services'
import { AuthContext } from "../../../contexts/auth.context"

const VenueDetailsPage = () => {
    const { id } = useParams()
    const [venue, setVenue] = useState()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadVenue()
    }, [])

    const loadVenue = () => {
        venuesService
            .venueDetails(id)
            .then(({ data }) => setVenue(data))
            .catch(err => console.log(err))
    }

    const handleSubmit = e => {
        e.preventDefault()
        venuesService
            .venueDelete(id)
            .then(() => navigate('/salas'))
            .catch(err => console.log(err))
    }

    const handleSubmitFavorites = e => {
        e.preventDefault()
        usersService
            .userAddVenue(user._id, id)
            .then(() => navigate('/salas'))
            .catch(err => console.log(err))
    }

    return (
        <Container>
            {
                !venue
                    ?
                    <Loader />
                    :
                    <>
                        <h1><strong>{venue.name}</strong></h1>
                        <hr />


                        <Row>

                            <Col md={{ span: 6 }}>
                                <h4><strong>Descripcion</strong></h4>
                                <p>{venue.description}</p>
                                <h4><strong>Dirección</strong></h4>
                                <p>{venue.address}</p>
                                <h4> <strong> Características de la Sala</strong></h4>
                                <ul>
                                    <li> <strong>Capacidad:  </strong>{venue.capacity} personas</li>
                                    <li><strong>Horario de apertura:  </strong> {venue.openingHours}</li>
                                    <li><strong>Teléfono de contacto:  </strong> {venue.phone}</li>
                                    <li><strong>Otros datos de la Sala:  </strong></li>
                                    <ul>
                                        {venue.features.map(f => {
                                            return (
                                                <li key={f}>
                                                    {f}
                                                </li>
                                            )
                                        })}
                                    </ul>

                                </ul>
                                <hr />
                                <Row>
                                    <Col md={{ span: 4 }}>
                                        <Link to="/salas">
                                            <Button variant="dark" >Volver al listado</Button>
                                        </Link>
                                    </Col>

                                    <Col md={{ span: 4 }}>
                                        <Link to={`/editar-sala/${id}`}>
                                            <Button variant="dark" >Editar Sala</Button>
                                        </Link>
                                    </Col>

                                    <Col md={{ span: 4 }}>
                                        <Form onSubmit={handleSubmit}>
                                            <Button variant="danger" type="submit">Eliminar Sala</Button>
                                        </Form>
                                    </Col>
                                    <Col md={{ span: 4 }}>
                                        <Form onSubmit={handleSubmitFavorites}>
                                            <Button variant="dark" type="submit">Añadir Sala a Favoritas</Button>
                                        </Form>
                                    </Col>

                                </Row>


                            </Col>

                            <Col md={{ span: 6 }}>
                                <img src={venue.venueImg} style={{ width: '100%' }} />
                            </Col>

                        </Row>
                        <Link to={`/crear-evento?venue_id=${venue._id}`}>
                            <Button variant="dark" style={{ marginBottom: '30px' }} type="submit"> Crear Evento</Button>
                        </Link>
                    </>
            }

        </Container>
    )

}

export default VenueDetailsPage