import { useState, useEffect, useContext } from "react"
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import eventsService from "../../services/event.services"
import venuesService from './../../services/venues.services'
import { AuthContext } from './../../contexts/auth.context'
import FormError from "../FormError/FormError"
import ShowAlert from './../../components/ShowAlert/ShowAlert';
import './NewEventForm.css'

const NewEventForm = ({ fireFinalActions, venueId }) => {

    const { user } = useContext(AuthContext)

    const [eventData, setEventData] = useState({
        name: '',
        musicStyle: '',
        requiredExperience: '',
        venueEvent: venueId ? venueId : '',
        eventDate: '',
        assistants: user._id,
        maxPlaces: '',
        venueName: ''
    })

    const [errors, setErrors] = useState([])

    const [venues, setVenues] = useState([])

    const [isUnavailable, setIsUnavailable] = useState(false)

    const checkAvailability = (e) => {

        if (!eventData.venueEvent) {
            return

        } else {

            const { value: dateSelected } = e.target

            venuesService
                .checkAvailability(eventData.venueEvent, dateSelected)
                .then(({ data }) => setIsUnavailable(data))
                .then(setEventData({ ...eventData, eventDate: dateSelected }))
                .catch(err => console.log(err))

        }
    }

    useEffect(() => {
        loadVenues()
    }, [])

    useEffect(() => {
        venueId && venues.length && loadVenueInfo()
    }, [venues])

    const loadVenueInfo = () => {
        const currentVenue = venues.find(venue => venue._id == venueId)
        setEventData({ ...eventData, maxPlaces: currentVenue.capacity, venueName: currentVenue.name })
    }

    const loadVenues = () => {
        venuesService
            .getAllVenues()
            .then(({ data }) => setVenues(data))
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        setEventData({ ...eventData, [name]: value })

        if (name === 'venueEvent') {
            const currentVenue = venues.find(venue => venue._id == value)
            setEventData({ ...eventData, maxPlaces: currentVenue.capacity, venueEvent: value })
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (isUnavailable) {
            return (
                alert('Por favor, consulta otras fechas para confirmar disponibilidad')
                // <ShowAlert message="Por favor, consulta otras fechas para confirmar disponibilidad" title="Lo sentimos, no hay disponibilidad de sala en la fecha seleccionada" />
            )

        } else {
            eventsService
                .newEvent(eventData)
                .then(() => {
                    fireFinalActions()
                })
                .catch(err => setErrors(err.response.data.errorMessages))
        }

    }

    const { name, musicStyle, requiredExperience, venueEvent, eventDate, assistants, maxPlaces, venueName } = eventData

    return (
        <Container className='newEventForm'>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label style={{ color: "white", fontWeight: "bold" }}>Dale un nombre a tu Ensayo</Form.Label>
                    <Form.Control type="text" value={name} onChange={handleInputChange} name="name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="musicStyle">
                    <Form.Label style={{ color: "white", fontWeight: "bold" }}>Estilo de música del ensayo</Form.Label>
                    <Form.Select value={musicStyle} onChange={handleInputChange} name="musicStyle">
                        <option disabled value="">
                            Seleccione un estilo musical
                        </option>
                        <option value="Rock">Rock</option>
                        <option value="Blues">Blues</option>
                        <option value="Flamenco">Flamenco</option>
                        <option value="Latin">Latin</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Pop">Pop</option>
                    </Form.Select>
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="requiredExperience">
                            <Form.Label style={{ color: "white", fontWeight: "bold" }}>Experiencia Requerida</Form.Label>
                            <Form.Select value={requiredExperience} onChange={handleInputChange} name="requiredExperience">
                                <option disabled value="">
                                    Seleccione un nivel
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col>

                        <Form.Group className="mb-3" controlId="venueEvent">
                            <Form.Label style={{ color: "white", fontWeight: "bold" }}>Sala del Ensayo</Form.Label>

                            {venueId
                                ?
                                <Form.Select value={venueEvent} onChange={handleInputChange} name="venueEvent" disabled>
                                    <option key={venueEvent} value={venueEvent}>{venueName}</option>
                                </Form.Select>

                                :

                                <Form.Select value={venueEvent} onChange={handleInputChange} name="venueEvent">
                                    <option disabled value="">
                                        Selecciona Sala de ensayo
                                    </option>
                                    {
                                        venues.map(venue => <option key={venue._id} value={venue._id}>{venue.name}</option>)
                                    }
                                </Form.Select>
                            }
                        </Form.Group>

                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="eventDate">
                            <Form.Label style={{ color: "white", fontWeight: "bold" }}>Fecha del Evento</Form.Label>
                            <Form.Control type="date" value={eventDate} onChange={checkAvailability} name="eventDate" />
                            {isUnavailable && <Form.Text style={{ color: 'white', backgroundColor: 'red', fontSize: '25px' }}>Fecha no disponible. Elige otra</Form.Text>}
                        </Form.Group>
                    </Col>
                    {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}
                </Row>
                <Form.Group className="mb-3" controlId="maxPlaces" >
                    <Form.Label style={{ color: "white", fontWeight: "bold" }}>Nº Máximo de Participantes</Form.Label>
                    <Form.Control type="text" value={maxPlaces} onChange={handleInputChange} name="maxPlaces" disabled />
                </Form.Group>

                <div className="d-grid">
                    {eventData.venueEvent ? null : <ShowAlert message="Debes seleccionar una sala para comprobar la disponibilidad" title="Por favor, selecciona una sala" />}
                    <Button variant="dark" style={{ marginBottom: '30px', background: '#461B37', fontWeight: "bold" }} type="submit">Crear Evento</Button>
                </div>

            </Form>
        </Container>
    )
}

export default NewEventForm