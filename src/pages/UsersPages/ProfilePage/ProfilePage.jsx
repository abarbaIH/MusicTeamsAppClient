import { useContext } from "react"
import { Container, Button, Row } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { AuthContext } from "./../../../contexts/auth.context"



const ProfilePage = () => {
    const { user } = useContext(AuthContext)

    return (

        <Container>
            <h1> ¡Hola, {user.firstName}!</h1>
            <Row>
                <Link to="/crear-sala">
                    <Button variant="dark" style={{ marginBottom: '30px' }} type="submit"> Crear Sala</Button>
                </Link>
                <Link to="/crear-evento">
                    <Button variant="dark" style={{ marginBottom: '30px' }} type="submit"> Crear Evento</Button>
                </Link>
            </Row>
        </Container>

    )
}

export default ProfilePage