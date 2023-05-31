import { useState } from "react"
import { Form, Button, Row, Col, FormSelect } from "react-bootstrap"
import eventsService from "../../services/event.services"
// import uploadServices from "../../services/upload.services"

// PARÁMETROS UPDATELIST
const NewEventForm = ({ closeModal, updateList }) => {

    const [eventData, setEventData] = useState({
        name: '',
        musicStyle: '',
        requiredExperience: '',
        venueEvent: '',
        eventDate: '',
        assistants: "",
    })

    // const [loadingImage, setLoadingImage] = useState(false)

    const handleInputChange = e => {
        const { name, value } = e.target
        setEventData({ ...eventData, [name]: value })
    }

    // const handle venueEventChange = e => {
    //     const selectedVenueEvent = Array.from(e.target.selectedOptions, option => option.value)
    //     setEventData({ ...eventData,  venueEvent: selectedVenueEvent })
    // }

    const handleSubmit = e => {
        e.preventDefault()

        eventsService
            .newEvent(eventData)
            .then(() => {
                closeModal()
                updateList()
            })
            .catch(err => console.log(err))
    }

    // const handleFileUpload = e => {

    //     setLoadingImage(true)

    //     const formData = new FormData()
    //     formData.append('imageData', e.target.files[0])

    //     uploadServices
    //         .uploadimage(formData)
    //         .then(({ data }) => {
    //             setVenueData({ ...venueData, venueImg: data.cloudinary_url })
    //             setLoadingImage(false)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             setLoadingImage(false)
    //         })
    // }

    //     name: '',
    // musicStyle: '',
    // requiredExperience: '',
    // venueEvent: '',
    // eventDate: '',
    // assistants: []

    const { name, musicStyle, requiredExperience, venueEvent, eventDate, assistants } = eventData

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Dale un nombre a tu Ensayo</Form.Label>
                <Form.Control type="text" value={name} onChange={handleInputChange} name="name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="musicStyle">
                <Form.Label>Estilo Musical</Form.Label>
                <Form.Control type="text" value={musicStyle} onChange={handleInputChange} name="musicStyle" />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="requiredExperience">
                        <Form.Label>Experiencia Requerida para el evento</Form.Label>
                        <Form.Control type="text" value={requiredExperience} onChange={handleInputChange} name="requiredExperience" />
                    </Form.Group>

                </Col>

                <Col>
                    <Form.Group className="mb-3" controlId="venueEvent">
                        <Form.Label>Sala del evento</Form.Label>
                        <Form.Control type="text" value={venueEvent} onChange={handleInputChange} name="venueEvent" />
                    </Form.Group>

                </Col>

                <Col>
                    <Form.Group className="mb-3" controlId="eventDate">
                        <Form.Label>Fecha del Evento</Form.Label>
                        <Form.Control type="date" value={eventDate} onChange={handleInputChange} name="eventDate" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="assistants">
                        <Form.Label>Asistentes</Form.Label>
                        <Form.Control type="text" value={assistants} onChange={handleInputChange} name="assistants" />
                    </Form.Group>
                </Col>
            </Row>

            {/* <Form.Group className="mb-3" controlId="venueImg">
                <Form.Label>Imagen de la Sala</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="features">
                <Form.Label>Características de la Sala</Form.Label>
                <Form.Select multiple value={features} onChange={handleFeaturesChange} name="features">
                    <option value="Parking">Parking</option>
                    <option value="Aire Acondicionado">Aire Acondicionado</option>
                    <option value="Alquiler de material">Alquiler de material</option>
                    <option value="Microfonía">Microfonía</option>
                    <option value="Amplificadores">Amplificadores</option>
                    <option value="Wifi">Wifi</option>
                    <option value="Almacén">Almacén</option>
                    <option value="Cafetería">Cafetería</option>
                    <option value="Batería">Batería</option>
                    <option value="Estudio de Grabación">Estudio de Grabación</option>
                </Form.Select>
            </Form.Group> */}


            <div className="d-grid">
                <Button variant="dark" style={{ marginBottom: '30px' }} type="submit"> Crear Evento</Button>
            </div>
        </Form>
    )
}

export default NewEventForm