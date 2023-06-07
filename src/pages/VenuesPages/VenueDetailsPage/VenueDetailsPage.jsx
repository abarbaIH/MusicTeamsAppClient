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
        <Container className="venueDetailsPage">
            {
                !venue
                    ?
                    <Loader />
                    :
                    <>
                        <h1 className="mt-4"><strong>{venue.name}</strong></h1>
                        <hr />

                        <Container className="venueDetails">
                            <Row>
                                <Col className="venueInfo">
                                    <Row className="infoText">

                                        <h4> <strong> Características de la Sala:</strong></h4>
                                        <ul>
                                            <li> <strong>Capacidad:  </strong>{venue.capacity} personas</li>
                                            <li><strong>Horario de apertura:  </strong> {venue.openingHours}</li>
                                            <li><strong>Equipamiento de la sala: </strong></li>
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

                                    </Row>


                                    <Row className="description">
                                        <h4><strong>Descripcion: </strong></h4>
                                        <ul>
                                            {venue.description}

                                        </ul>
                                    </Row>

                                    <Row className="contactInfo">
                                        <h4> <strong>Datos de contacto:</strong></h4>
                                        <ul>
                                            <>
                                                {!venue.manager
                                                    ?
                                                    <Loader />
                                                    :
                                                    <li> <strong> Manager de la Sala: </strong>{venue.manager.firstName}</li>
                                                }
                                            </>
                                            <li>
                                                <strong>Dirección: </strong> {venue.address}
                                            </li>
                                            <li>
                                                <strong>Teléfono de contacto:  </strong> {venue.phone}
                                            </li>

                                        </ul>

                                    </Row>
                                    <Row className="buttons mb-5">

                                        <Col md={{ span: 4 }}>
                                            <Link to="/salas">
                                                <Button className="goBack">
                                                    <img className="goBack" src={goBack} alt="goBack" />
                                                </Button>
                                            </Link>
                                            <p className="mt-3">Volver atrás</p>

                                        </Col>

                                        <Col md={{ span: 4 }}>
                                            {
                                                !userView
                                                    ?
                                                    <Loader />
                                                    :
                                                    userView?.venueFavorites?.includes(id)
                                                        ?

                                                        <>
                                                            <Button onClick={handleSubmitDeleteFavorites} className="DislikeButton" type="submit">
                                                                <img className="DislikeButton" src={DislikeButton} alt="dislike" />
                                                            </Button>
                                                            <p className="mt-3">Eliminar de Favoritos</p>

                                                        </>

                                                        :
                                                        <>
                                                            <Button onClick={handleSubmitFavorites} className="likeButton" type="submit">
                                                                <img className="likeButton" src={likeButton} alt="like" />
                                                            </Button>
                                                            <p className="mt-3">Añadir a Favoritos</p>

                                                        </>

                                            }

                                        </Col>

                                        <Col md={{ span: 4 }}>
                                            <Link to={`/crear-evento?venue_id=${venue._id}`}>
                                                <Button className="createEvent" type="submit">
                                                    <img className="createEvent" src={createEvent} alt="createEvent" />
                                                </Button>
                                            </Link>
                                            <p className="mt-3">Crear evento</p>

                                        </Col>

                                    </Row>
                                </Col>

                                <Col className="graphicInfo">

                                    <Row className="venueImage d-flex justify-content-center align-items-center">
                                        <img src={venue.venueImg} style={{ width: '100% ' }} />
                                    </Row>

                                    <Row className="venueMap">
                                        <Maps latitud={venue.location.coordinates[0]} longitud={venue.location.coordinates[1]} />
                                    </Row>

                                </Col>

                            </Row>


                        </Container>

                    </>
            }

        </Container >
    )

}

export default VenueDetailsPage