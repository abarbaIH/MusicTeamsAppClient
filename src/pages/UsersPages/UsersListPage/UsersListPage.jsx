import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import usersService from '../../../services/users.services'
import UserCard from '../../../components/UserCard/UserCard'




const UsersListPage = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        usersService
            .getAllUsers()
            .then(({ data }) => setUsers(data))
            .catch(error => console.log(error))
    }, [])

    return (
        <Container>

            <h1>USER LIST PAGEEEE</h1>
            <hr />
            <Row>
                {
                    users.map(user => {
                        return (
                            <Col md={{ span: 3 }} key={user._id} lg={{ span: 4 }}>
                                <UserCard {...user} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default UsersListPage