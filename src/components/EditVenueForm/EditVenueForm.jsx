import React from 'react'
import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import uploadServices from './../../services/upload.services'
import venuesService from './../../services/venues.services'
import FormError from '../FormError/FormError'

const EditVenueForm = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [venueEdit, setVenueEdit] = useState({
        name: '',
        address: '',
        phone: '',
        openingHours: '',
        venueImg: '',
        features: [],
        capacity: '',
        description: '',
        venueImg: '',
    })

    const [errors, setErrors] = useState([])

    const [loadingImage, setLoadingImage] = useState(false)

    const { name, address, phone, openingHours, features, capacity, description, venueImg } = venueEdit

    useEffect(() => {
        loadVenues()
    }, [])

    const loadVenues = () => {
        venuesService
            .venueEdit(id)
            .then(({ data }) => {
                const updateVenue = data
                setVenueEdit(updateVenue)
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.target
        const selectedFeatures = name === "features" ? Array.from(e.target.selectedOptions, option => option.value) : value
        setVenueEdit({ ...venueEdit, [name]: selectedFeatures })
    }

    const handleSubmit = e => {
        e.preventDefault()
        venuesService
            .venueEdit(id, venueEdit)
            .then(() => navigate('/salas'))
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setVenueEdit({ ...venueEdit, venueImg: data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }

    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label style={{ color: 'white', fontWeight: "bold" }}>Nombre de la Sala</Form.Label>
                <Form.Control type="text" value={name} onChange={handleInputChange} name="name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
                <Form.Label style={{ color: 'white', fontWeight: "bold" }}>Direccion</Form.Label>
                <Form.Control type="text" value={address} onChange={handleInputChange} name="address" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
                <Form.Label style={{ color: 'white', fontWeight: "bold" }}>Teléfono de contacto</Form.Label>
                <Form.Control type="text" value={phone} onChange={handleInputChange} name="phone" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="openingHours">
                <Form.Label style={{ color: 'white', fontWeight: "bold" }}>Horario de Apertura</Form.Label>
                <Form.Control type="text" value={openingHours} onChange={handleInputChange} name="openingHours" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="venueImg">
                <Form.Label style={{ color: 'white', fontWeight: "bold" }}>Imagen de la Sala</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="capacity">
                <Form.Label style={{ color: 'white', fontWeight: "bold" }}>Capacidad de la Sala</Form.Label>
                <Form.Control type="text" value={capacity} onChange={handleInputChange} name="capacity" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="features">
                <Form.Label style={{ color: 'white', fontWeight: "bold" }}>Características de la Sala</Form.Label>
                <Form.Select multiple value={features} onChange={handleInputChange} name="features">
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
                <Form.Label style={{ color: 'white', fontWeight: "bold" }}>Descripción</Form.Label>
                <Form.Control type="text" value={description} onChange={handleInputChange} name="description" />
            </Form.Group>

            {console.log(errors)}
            {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

            <div className="d-grid">
                <Button variant="dark" style={{ background: '#461B37', marginBottom: '30px' }} disabled={loadingImage} type="submit">

                    {
                        loadingImage ? "Cargando Imagen.." : "Guardar cambios"
                    }

                </Button>
            </div>
        </Form>
    )
}

export default EditVenueForm