import { useState } from "react"
import { Form, Button } from "react-bootstrap"
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

            {/* TIPO IMAGE */}
            <Form.Group className="mb-3" controlId="avatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="text" value={avatar} onChange={handleInputChange} name="avatar" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="aboutMe">
                <Form.Label>Sobre mi</Form.Label>
                <Form.Control type="text" value={aboutMe} onChange={handleInputChange} name="aboutMe" />
            </Form.Group>

            {/* SELECT */}
            <Form.Group className="mb-3" controlId="instrument">
                <Form.Label>Instrumento</Form.Label>
                <Form.Control type="text" value={instrument} onChange={handleInputChange} name="instrument" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="level">
                <Form.Label>Level</Form.Label>
                <Form.Control type="string" value={level} onChange={handleInputChange} name="level" />
            </Form.Group>


            <div className="d-grid">
                <Button variant="dark" type="submit">Registrarme</Button>
            </div>

        </Form>
    )
}

export default SignupForm