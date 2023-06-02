import { useState, useEffect, useContext } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import eventsService from "../../services/event.services"
// import uploadServices from "../../services/upload.services"
import venuesService from './../../services/venues.services'
import { AuthContext } from './../../contexts/auth.context'

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

    const [venues, setVenues] = useState([])

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

        eventsService
            .newEvent(eventData)
            .then(() => {
                fireFinalActions()
            })
            .catch(err => console.log(err))
    }

    const { name, musicStyle, requiredExperience, venueEvent, eventDate, assistants, maxPlaces, venueName } = eventData

    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Dale un nombre a tu Ensayo</Form.Label>
                <Form.Control type="text" value={name} onChange={handleInputChange} name="name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="musicStyle">
                <Form.Label>Estilo de música del ensayo</Form.Label>
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
                        <Form.Label>Experiencia Requerida</Form.Label>
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
                        <Form.Label>Sala del Ensayo</Form.Label>

                        {venueId
                            ?
                            <Form.Select value={venueEvent} onChange={handleInputChange} name="venueEvent" disabled>
                                <option key={venueEvent} value={venueEvent}>{venueName}</option>
                            </Form.Select>

                            :

                            <Form.Select value={venueEvent} onChange={handleInputChange} name="venueEvent">
                                {
                                    venues.map(venue => <option key={venue._id} value={venue._id}>{venue.name}</option>)
                                }
                            </Form.Select>
                        }
                    </Form.Group>

                </Col>

                <Col>
                    <Form.Group className="mb-3" controlId="eventDate">
                        <Form.Label>Fecha del Evento</Form.Label>
                        <Form.Control type="date" value={eventDate} onChange={handleInputChange} name="eventDate" />
                    </Form.Group>
                </Col>

                {/* <Col>
                    <Form.Group className="mb-3" controlId="assistants">
                        <Form.Label>Participantes</Form.Label>
                        <Form.Control type="text" value={assistants} onChange={handleInputChange} name="assistants" />
                    </Form.Group>
                </Col> */}
            </Row>
            <Form.Group className="mb-3" controlId="maxPlaces" >
                <Form.Label>Nº Máximo de Participantes</Form.Label>
                <Form.Control type="text" value={maxPlaces} onChange={handleInputChange} name="maxPlaces" disabled />
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" style={{ marginBottom: '30px' }} type="submit">Crear Evento</Button>
            </div>

        </Form>

    )
}

export default NewEventForm