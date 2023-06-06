import { useContext, useEffect, useState, React } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import venuesService from "./../../../services/venues.services"
import Loader from "./../../../components/Loader/Loader"
import usersService from './../../../services/users.services'
import { AuthContext } from "../../../contexts/auth.context"
import Maps from "../../../components/Maps/Maps"
import './VenueDetailsPage.css'
import likeButton from './../../../assets/LikeButton.png'
import DislikeButton from './../../../assets/DislikeButton.png'
import createEvent from './../../../assets/createEvent.png'
import goBack from './../../../assets/goBack.png'

const VenueDetailsPage = () => {

    const { id } = useParams()
    const [venue, setVenue] = useState()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [userView, setUserView] = useState()

    useEffect(() => {
        loadUserView()
    }, [user])

    const loadUserView = () => {
        usersService
            .userDetails(user._id)
            .then(({ data }) => setUserView(data))
            .catch(err => console.log(err))
    }

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
            .userAddVenue(userView._id, id)
            .then(({ data }) => {
                const updateUser = data
                setUserView(updateUser)
            })
            .catch(err => console.log(err))
    }

    const handleSubmitDeleteFavorites = e => {
        e.preventDefault()
        usersService
            .userDeleteVenue(userView._id, id)
            .then(({ data }) => {
                const updateUser = data
                setUserView(updateUser)
            })
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
                        <h1 className="mt-4"><strong>{venue.name}</strong></h1>

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
                                        <p>Volver atrás</p>
                                        <Link to="/salas">
                                            <Button className="goBack">
                                                <img className="goBack" src={goBack} alt="goBack" />
                                            </Button>
                                        </Link>
                                    </Col>

                                    <Col md={{ span: 4 }}>
                                        {
                                            !userView
                                                ?
                                                <Loader />
                                                :
                                                userView.venueFavorites.includes(id)
                                                    ?
                                                    <>
                                                        <p>Eliminar de Favoritos</p>
                                                        <Form onSubmit={handleSubmitDeleteFavorites}>
                                                            <Button className="DislikeButton" type="submit">
                                                                <img className="DislikeButton" src={DislikeButton} alt="dislike" />
                                                            </Button>
                                                        </Form>
                                                    </>


                                                    :
                                                    <>
                                                        <p>Añadir a Favoritos</p>
                                                        <Form onSubmit={handleSubmitFavorites}>
                                                            <Button className="likeButton" type="submit">
                                                                <img className="likeButton" src={likeButton} alt="like" />
                                                            </Button>
                                                        </Form>
                                                    </>

                                        }

                                    </Col>
                                    {/* <Col md={{ span: 4 }}>
                                        <Link to={`/crear-evento?venue_id=${venue._id}`}>
                                            <Button variant="dark" style={{ marginBottom: '30px' }} type="submit"> Crear Evento</Button>
                                        </Link>
                                    </Col> */}

                                    <Col md={{ span: 4 }}>
                                        <p>Crear evento</p>
                                        <Link to={`/crear-evento?venue_id=${venue._id}`}>
                                            <Button className="createEvent" type="submit">
                                                <img className="createEvent" src={createEvent} alt="createEvent" />
                                            </Button>
                                        </Link>
                                    </Col>

                                </Row>

                                {/* <Row className="mb-5">
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

                                </Row> */}

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