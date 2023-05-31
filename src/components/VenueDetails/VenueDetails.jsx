import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import venuesService from "./../../services/venues.services"
import { Row, Col, Button, Form } from "react-bootstrap"
import Loader from "./../../components/Loader/Loader"

const VenueDetails = () => {

    const { id } = useParams()
    const [venue, setVenue] = useState()
    const navigate = useNavigate()

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

    return (
        <>

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

                                </Row>


                            </Col>

                            <Col md={{ span: 6 }}>
                                <img src={venue.venueImg} style={{ width: '100%' }} />
                            </Col>

                        </Row>
                    </>
            }

        </>
    )

}

export default VenueDetails