import { useContext, useState } from "react"
import { Form, Button, Container } from "react-bootstrap"
import authService from './../../services/auth.services'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../contexts/auth.context"
import FormError from "./../../components/FormError/FormError"
import './LoginForm.css'

const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const [errors, setErrors] = useState([])

    const { authenticateUser, storeToken } = useContext(AuthContext)

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = e => {

        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                navigate('/')
            }
            )
            .catch(err => setErrors(err.response.data.errorMessages))
    }


    const { password, email } = loginData

    return (

        <Container className='loginForm'>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label style={{ color: "white", fontWeight: "bold" }}>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label style={{ color: "white", fontWeight: "bold" }}>Contraseña</Form.Label>
                    <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
                </Form.Group>

                <div className="d-grid">
                    <Button style={{ color: "white", background: '#461B37', fontWeight: "bold" }} variant="dark" type="submit">Acceder</Button>
                </div>
                {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}
            </Form>
        </Container>


    )
}

export default LoginForm