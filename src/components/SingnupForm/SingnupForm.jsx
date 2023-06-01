import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import uploadServices from "../../services/upload.services"
import authService from './../../services/auth.services'
import { useNavigate } from "react-router-dom"

const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        avatar: '',
        aboutMe: '',
        instrument: '',
        level: ''

    })

    const [loadingImage, setLoadingImage] = useState(false)

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .signup(signupData)
            .then(({ data }) => navigate('/usuarios'))
            .catch(err => console.log(err))
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(({ data }) => {
                setSignupData({ ...signupData, avatar: data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }

    const { email, password, firstName, lastName, avatar, aboutMe, instrument, level } = signupData

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" value={firstName} onChange={handleInputChange} name="firstName" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Apellido de usuario</Form.Label>
                <Form.Control type="text" value={lastName} onChange={handleInputChange} name="lastName" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="avatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="aboutMe">
                <Form.Label>Sobre mi</Form.Label>
                <Form.Control type="text" value={aboutMe} onChange={handleInputChange} name="aboutMe" />
            </Form.Group>

            {/* SELECT */}

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
                <Form.Label>Nivel de Experiencia</Form.Label>
                <Form.Select value={level} onChange={handleInputChange} name="level">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </Form.Select>
            </Form.Group>


            <div className="d-grid">
                <Button variant="dark" type="submit" disabled={loadingImage}>
                    {
                        loadingImage ? "Cargando Imagen.." : "Registrarme"
                    }
                </Button>
            </div>

        </Form>
    )
}

export default SignupForm