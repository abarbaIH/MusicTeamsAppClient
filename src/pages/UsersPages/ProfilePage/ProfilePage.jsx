import { useContext } from "react"
import { Container } from 'react-bootstrap'
import { AuthContext } from "./../../../contexts/auth.context"


const ProfilePage = () => {
    const { user } = useContext(AuthContext)

    return (

        <Container>
            <h1> ¡Hola, {user.firstName}!</h1>
        </Container>

    )
}

export default ProfilePage