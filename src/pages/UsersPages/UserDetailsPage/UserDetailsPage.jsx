import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container } from "react-bootstrap"
import usersService from "../../../services/users.services"
import UserDetails from "../../../components/UserDetails/UserDetails"


const UserDetailsPage = () => {

    const { id } = useParams()

    const [user, setUser] = useState({})

    useEffect(() => {
        usersService
            .userDetails(id)
            .then(({ data }) => setUser(data))
            .catch(err => console.log(err))
    }, [id])

    return (
        <Container>
            {!user
                ?
                <h1>CARGANDO...</h1>
                :
                <UserDetails {...user} />
            }
        </Container >
    )
}

export default UserDetailsPage