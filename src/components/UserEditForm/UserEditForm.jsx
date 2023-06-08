// import React from 'react'
import { useEffect, useState, React } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'

import usersService from './../../services/users.services'
import uploadServices from './../../services/upload.services'
import './UserEditForm.css'


const UserEditForm = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [userEdit, setUserEdit] = useState({

        firstName: '',
        lastName: '',
        avatar: '',
        aboutMe: '',
        instrument: '',
        level: '',
        email: '',
        role: '',

    })

    const [loadingImage, setLoadingImage] = useState(false)

    const { email, role, firstName, lastName, avatar, aboutMe, instrument, level } = userEdit
    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        usersService
            .userEdit(id)
            .then(({ data }) => {
                const updateUser = data
                setUserEdit(updateUser)
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.target
        setUserEdit({ ...userEdit, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        usersService
            .userEdit(id, userEdit)
            .then(() => navigate(`/usuarios/detalles/${id}`))
            .catch(err => console.log(err))
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setUserEdit({ ...userEdit, avatar: data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }

    return (
        <Container className='UserEditForm'>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="fis">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" value={firstName} onChange={handleInputChange} name="firstName" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="fis">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" value={lastName} onChange={handleInputChange} name="lastName" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="fis">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="avatar">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="fis">
                    <Form.Label>Sobre mi</Form.Label>
                    <Form.Control type="text" value={aboutMe} onChange={handleInputChange} name="aboutMe" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="instrument">
                    <Form.Label>Instrumento</Form.Label>
                    <Form.Select value={instrument} onChange={handleInputChange} name="instrument">
                        <option disabled value="">
                            Selecciona el instrumento que tocas
                        </option>
                        <option value="Guitarra">Guitarra</option>
                        <option value="Bajo">Bajo</option>
                        <option value="Violín">Violín</option>
                        <option value="Piano">Piano</option>
                        <option value="Batería">Batería</option>
                        <option value="Saxofón">Saxofón</option>
                        <option value="Trompeta">Trompeta</option>
                        <option value="Percusión">Percusión</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="level">
                    <Form.Label>Nivel de Experiencia</Form.Label>
                    <Form.Select value={level} onChange={handleInputChange} name="level">
                        <option disabled value="">
                            Selecciona nivel de Experiencia
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Form.Select>
                </Form.Group>

                <div className="d-grid">
                    <Button className='buttonEdit' variant="dark" style={{ marginBottom: '30px' }} disabled={loadingImage} type="submit">

                        {
                            loadingImage ? "Cargando Imagen.." : "Guardar cambios"
                        }

                    </Button>
                </div>

            </Form>
        </Container>
    )

}

export default UserEditForm
