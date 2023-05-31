import { Col } from 'react-bootstrap'
import UserCard from '../UserCard/UserCard'

const UsersList = ({ users }) => {

    return (
        users.map(user => {
            return (
                <Col md={{ span: 3 }} key={user._id} lg={{ span: 4 }}>
                    <UserCard {...user} />
                </Col>
            )
        })
    )
}

export default UsersList