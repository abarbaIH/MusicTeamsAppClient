import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import venuesService from "./../../../services/venues.services"
import { Row, Col, Container, Button } from "react-bootstrap"
import Loader from "./../../../components/Loader/Loader"

const VenueDetailsPage = () => {

    const { id } = useParams()

    const [venue, setVenue] = useState()

    useEffect(() => {
        loadVenue()
    }, [])

    const loadVenue = () => {
        venuesService
            .venueDetails(id)
            .then(({ data }) => setVenue(data))
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
                                <Link to="/salas">
                                    <Button variant="dark" style={{ marginRight: '10px', marginBottom: '30px' }}>Volver al listado de salas</Button>
                                </Link>
                                <Link to="/salas">
                                    <Button variant="dark" style={{ marginRight: '10px', marginBottom: '30px' }}>Editar Sala</Button>
                                </Link>
                                <Link to="/salas">
                                    <Button variant="danger" style={{ marginRight: '10px', marginBottom: '30px' }}>Eliminar Sala</Button>
                                </Link>

                            </Col>

                            <Col md={{ span: 6 }}>
                                <img src={venue.venueImg} style={{ width: '100%' }} />
                            </Col>

                        </Row>
                    </>
            }

        </Container>
    )

}

export default VenueDetailsPage