import { useState, useEffect } from "react"
import { Form, Button, Container } from "react-bootstrap"
import uploadServices from "../../services/upload.services"
import authService from './../../services/auth.services'
import { useNavigate } from "react-router-dom"
import FormError from "./../../components/FormError/FormError"
import './SignupForm.css'

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
    const [errors, setErrors] = useState([])

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
            .then(({ data }) => {
                navigate('/usuarios')
            })
            .catch(err => setErrors(err.response.data.errorMessages))
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
        <Container className='signupForm'>

            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label style={{ color: "white", fontWeight: "bold" }}>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label style={{ color: "white", fontWeight: "bold" }}>Contraseña</Form.Label>
                    <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label style={{ color: "white", fontWeight: "bold" }}>Nombre de usuario</Form.Label>
                    <Form.Control type="text" value={firstName} onChange={handleInputChange} name="firstName" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label style={{ color: "white", fontWeight: "bold" }}>Apellido de usuario</Form.Label>
                    <Form.Control type="text" value={lastName} onChange={handleInputChange} name="lastName" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="avatar">
                    <Form.Label style={{ color: "white", fontWeight: "bold" }}>Avatar</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="aboutMe">
                    <Form.Label style={{ color: "white", fontWeight: "bold" }}>Sobre mi</Form.Label>
                    <Form.Control type="text" value={aboutMe} onChange={handleInputChange} name="aboutMe" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="instrument">
                    <Form.Label style={{ color: "white", fontWeight: "bold" }}>Instrumento</Form.Label>
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
                    <Form.Label style={{ color: "white", fontWeight: "bold" }}>Nivel de Experiencia</Form.Label>
                    <Form.Select value={level} onChange={handleInputChange} name="level">
                        <option disabled value="">
                            Selecciona tu nivel de Experiencia con el instrumento
                        </option>
                        <option value="1">Nivel 1: Principiante (menos de 1 año tocando)</option>
                        <option value="2">Nivel 2: Medio (más de 2 años tocando)</option>
                        <option value="3">Nivel 3: Avanzado (más de 3 años tocando)</option>
                        <option value="4">Nivel 4: Experto (más de 5 años tocando)</option>
                        <option value="5">Nivel 5: Profesional (menos de 10 años tocando)</option>
                    </Form.Select>
                </Form.Group>

                <div className="d-grid">
                    <Button style={{ color: "white", background: '#461B37', fontWeight: "bold" }} variant="dark" type="submit" disabled={loadingImage}>
                        {
                            loadingImage ? "Cargando Imagen.." : "Registrarme"
                        }
                    </Button>
                </div>


                {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

            </Form>
        </Container>
    )
}

export default SignupForm