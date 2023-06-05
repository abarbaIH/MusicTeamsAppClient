import { useContext, useEffect, useState, React } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import venuesService from "./../../../services/venues.services"
import Loader from "./../../../components/Loader/Loader"
import usersService from './../../../services/users.services'
import { AuthContext } from "../../../contexts/auth.context"
import Maps from "../../../components/Maps/Maps"

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

    const handleSubmitDeleteFavorites = e => {
        e.preventDefault()
        usersService
            .userDeleteVenue(user._id, id)
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
                                <h4><strong>Manager de la sala</strong></h4>
                                <>
                                    {!venue.manager
                                        ?
                                        <Loader />
                                        :
                                        <p>{venue.manager.firstName}</p>
                                    }
                                </>
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

                                        {
                                            user.venueFavorites.includes(id)
                                                ?
                                                <Form onSubmit={handleSubmitDeleteFavorites}>
                                                    <Button variant="danger" type="submit">Quitar de Favoritas</Button>
                                                </Form>

                                                :
                                                <Form onSubmit={handleSubmitFavorites}>
                                                    <Button variant="success" type="submit">Añadir a Favoritas</Button>
                                                </Form>
                                        }

                                    </Col>
                                    <Col md={{ span: 4 }}>
                                        <Link to={`/crear-evento?venue_id=${venue._id}`}>
                                            <Button variant="dark" style={{ marginBottom: '30px' }} type="submit"> Crear Evento</Button>
                                        </Link>

                                    </Col>

                                </Row>


                                <Row className="mb-5">
                                    <Col md={{ span: 6 }}>
                                        <Link to={`/editar-sala/${id}`}>
                                            <Button variant="dark" >Editar Sala</Button>
                                        </Link>
                                    </Col>
                                    <Col md={{ span: 6 }}>
                                        <Form onSubmit={handleSubmit}>
                                            <Button variant="danger" type="submit">Eliminar Sala</Button>
                                        </Form>
                                    </Col>

                                </Row>

                            </Col>

                            <Col md={{ span: 6 }}>
                                <Col className="mb-5">
                                    <img src={venue.venueImg} style={{ width: '75% ' }} />
                                </Col>

                                <Col>
                                    <Maps latitud={venue.location.coordinates[0]} longitud={venue.location.coordinates[1]} />

                                </Col>

                            </Col>

                        </Row>

                    </>
            }

        </Container>
    )

}

export default VenueDetailsPage