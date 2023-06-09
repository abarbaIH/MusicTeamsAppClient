import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import usersService from '../../../services/users.services'
import UsersList from '../../../components/UsersList/UsersList'
import './UsersListPage.css'

const UsersListPage = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = () => {
        usersService
            .getAllUsers()
            .then(({ data }) => setUsers(data))
            .catch(error => console.log(error))
    }

    return (
        <Container>
            <h1>MÚSICOS</h1>
            <hr />
            <Row>
                {
                    !users
                        ?
                        <h1>CARGANDO...</h1>
                        :
                        <UsersList users={users} />
                }
            </Row>
        </Container >

    )
}

export default UsersListPage