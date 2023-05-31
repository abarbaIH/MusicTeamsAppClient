import React from 'react'
import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
// import uploadServices from './../../services/upload.services'
import eventsService from '../../services/event.services'

const EditEventForm = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [eventEdit, setEventEdit] = useState({

        name: '',
        musicStyle: '',
        requiredExperience: '',
        venueEvent: '',
        eventDate: '',
        assistants: "",
    })

    const { name, musicStyle, requiredExperience, venueEvent, eventDate, assistants } = eventEdit

    useEffect(() => {
        eventsService
            .eventEdit(id)
            .then(({ data }) => {
                const { name, musicStyle, requiredExperience, venueEvent, eventDate, assistants } = data
                const updateEvent = { name, musicStyle, requiredExperience, venueEvent, eventDate, assistants }
                setEventEdit(updateEvent)
            })
            .catch(err => console.log(err))
    }, [])

    const handleInputChange = e => {
        const { value, name } = e.target

        setEventEdit({ ...eventEdit, [name]: value })
    }


    const handleSubmit = e => {
        e.preventDefault()
        eventsService
            .eventEdit(id, eventEdit)
            .then(() => navigate('/eventos-abiertos'))
            .catch(err => console.log(err))
    }

    // const handleFileUpload = e => {

    //     setLoadingImage(true)

    //     const formData = new FormData()
    //     formData.append('imageData', e.target.files[0])

    //     uploadServices
    //         .uploadimage(formData)
    //         .then(({ data }) => {
    //             setVenueEdit({ ...venueEdit, venueImg: data.cloudinary_url })
    //             setLoadingImage(false)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             setLoadingImage(false)
    //         })
    // }

    return (
        // name, musicStyle, requiredExperience, venueEvent, eventDate, assistants 

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nombre del Evento</Form.Label>
                <Form.Control type="text" value={name} onChange={handleInputChange} name="name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="musicStyle">
                <Form.Label>Estilo de música del ensayo</Form.Label>
                <Form.Control type="text" value={musicStyle} onChange={handleInputChange} name="musicStyle" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="requiredExperience">
                <Form.Label>Experiencia Requerida</Form.Label>
                <Form.Control type="text" value={requiredExperience} onChange={handleInputChange} name="requiredExperience" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="venueEvent">
                <Form.Label>Sala del ensayo</Form.Label>
                <Form.Control type="text" value={venueEvent} onChange={handleInputChange} name="venueEvent" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="eventDate">
                <Form.Label>Capacidad de la Sala</Form.Label>
                <Form.Control type="date" value={eventDate} onChange={handleInputChange} name="eventDate" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="assistants">
                <Form.Label>Asistentes</Form.Label>
                <Form.Control type="text" value={assistants} onChange={handleInputChange} name="assistants" />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="features">
                <Form.Label>Características de la Sala</Form.Label>
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
            </Form.Group> */}

            <div className="d-grid">
                <Button variant="dark" style={{ marginBottom: '30px' }} type="submit">Editar Evento</Button>
            </div>
        </Form>
    )
}

export default EditEventForm