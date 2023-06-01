import { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import venuesService from "./../../services/venues.services"
import uploadServices from "../../services/upload.services"

const NewVenueForm = ({ fireFinalActions }) => {

    const [venueData, setVenueData] = useState({
        name: '',
        address: '',
        phone: '',
        openingHours: '',
        venueImg: '',
        features: [],
        capacity: '',
        description: ''
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const handleInputChange = e => {
        const { name, value } = e.target
        setVenueData({ ...venueData, [name]: value })
    }

    const handleFeaturesChange = e => {
        const selectedFeatures = Array.from(e.target.selectedOptions, option => option.value)
        setVenueData({ ...venueData, features: selectedFeatures })
    }

    const handleSubmit = e => {
        e.preventDefault()

        venuesService
            .newVenue(venueData)
            .then(() => {
                fireFinalActions()
            })
            .catch(err => console.log(err))
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setVenueData({ ...venueData, venueImg: data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }

    const { name, address, phone, openingHours, venueImg, features, capacity, description } = venueData

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nombre de la Sala</Form.Label>
                <Form.Control type="text" value={name} onChange={handleInputChange} name="name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" value={address} onChange={handleInputChange} name="address" />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Teléfono de Contacto</Form.Label>
                        <Form.Control type="text" value={phone} onChange={handleInputChange} name="phone" />
                    </Form.Group>

                </Col>

                <Col>
                    <Form.Group className="mb-3" controlId="openingHours">
                        <Form.Label>Horario de Apertura</Form.Label>
                        <Form.Control type="text" value={openingHours} onChange={handleInputChange} name="openingHours" />
                    </Form.Group>

                </Col>

                <Col>
                    <Form.Group className="mb-3" controlId="capacity">
                        <Form.Label>Capacidad (nº de personas)</Form.Label>
                        <Form.Control type="text" value={capacity} onChange={handleInputChange} name="capacity" />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="venueImg">
                <Form.Label>Imagen de la Sala</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="features">
                <Form.Label>Características de la Sala</Form.Label>
                {/* TODO A FUTURO: CREAR COLECCIÓN SALAS */}
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text" value={description} onChange={handleInputChange} name="description" />
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" style={{ marginBottom: '30px' }} type="submit" disabled={loadingImage}>
                    {
                        loadingImage ? "Cargando Imagen.." : "Crear Sala"
                    }
                </Button>
            </div>
        </Form>
    )
}

export default NewVenueForm
