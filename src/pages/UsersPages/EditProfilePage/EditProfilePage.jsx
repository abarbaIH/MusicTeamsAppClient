import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'

import usersService from '../../../services/users.services'
import uploadServices from '../../../services/upload.services'

const EditProfilePage = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [userEdit, setUserEdit] = useState({

        firstName: '',
        lastName: '',
        avatar: '',
        aboutMe: '',
        instrument: '',
        level: '',
        venueFavorites: '',
        friends: '',
        email: '',
        role: '',

    })

    const [loadingImage, setLoadingImage] = useState(false)


    const { email, role, firstName, lastName, avatar, aboutMe, instrument, level, venueFavorites, friends } = userEdit
    useEffect(() => {
        usersService
            .userEdit(id)
            .then(({ data }) => {
                const {
                    email, role, firstName, lastName, avatar, aboutMe, instrument, level, venueFavorites, friends
                } = data
                const updateUser = {
                    email, role, firstName, lastName, avatar, aboutMe, instrument, level, venueFavorites, friends
                }
                setUserEdit(updateUser)
            })
            .catch(err => console.log(err))
    }, [])

    const handleInputChange = e => {
        const { value, name } = e.target
        setUserEdit({ ...userEdit, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        usersService
            .userEdit(id, userEdit)
            .then(() => navigate('/'))
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
        <Container>

            < div > EDIT PROFILE PAGEEEE</div >
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
                    <Form.Label>Nivel</Form.Label>
                    <Form.Select value={level} onChange={handleInputChange} name="level">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="fis">
                    <Form.Label>Salas favoritas</Form.Label>
                    <Form.Control type="text" value={venueFavorites} onChange={handleInputChange} name="venueFavorites" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="fis">
                    <Form.Label>Mis amigos</Form.Label>
                    <Form.Control type="text" value={friends} onChange={handleInputChange} name="friends" />
                </Form.Group>
                <div className="d-grid">
                    <Button variant="dark" type="submit">Guardar cambios editados</Button>
                </div>
            </Form>
        </Container>
    )

}

export default EditProfilePage
