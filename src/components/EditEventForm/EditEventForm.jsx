import React from 'react'
import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import eventsService from '../../services/event.services'
import FormError from '../FormError/FormError'
import './EditEventForm.css'


const EditEventForm = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [eventEdit, setEventEdit] = useState({

        name: '',
        musicStyle: '',
        requiredExperience: '',
        eventDate: '',
    })

    const [errors, setErrors] = useState([])

    const { name, musicStyle, requiredExperience, venueEvent, eventDate, assistants } = eventEdit

    useEffect(() => {
        loadEvents()
    }, [])

    const loadEvents = () => {
        eventsService
            .eventEdit(id)
            .then(({ data }) => {
                const updateEvent = data
                setEventEdit(updateEvent)
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.target
        setEventEdit({ ...eventEdit, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        eventsService
            .eventEdit(id, eventEdit)
            .then(() => navigate('/eventos-abiertos'))
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    return (
        <Container className='editEventForm'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nombre del Evento</Form.Label>
                    <Form.Control type="text" value={name} onChange={handleInputChange} name="name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="musicStyle">
                    <Form.Label>Estilo de música del ensayo</Form.Label>
                    <Form.Select value={musicStyle} onChange={handleInputChange} name="musicStyle">
                        <option value="Rock">Rock</option>
                        <option value="Blues">Blues</option>
                        <option value="Flamenco">Flamenco</option>
                        <option value="Latin">Latin</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Pop">Pop</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="requiredExperience">
                    <Form.Label>Experiencia Requerida</Form.Label>
                    <Form.Select value={requiredExperience} onChange={handleInputChange} name="requiredExperience">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="eventDate">
                    <Form.Label>Fecha del ensayo</Form.Label>
                    <Form.Control type="date" value={eventDate} onChange={handleInputChange} name="eventDate" />
                </Form.Group>

                {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}
                <div className="d-grid">
                    <Button variant="dark" style={{ marginBottom: '30px' }} type="submit">Editar Evento</Button>
                </div>
            </Form>
        </Container >
    )
}

export default EditEventForm