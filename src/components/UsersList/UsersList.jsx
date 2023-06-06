import { Col } from 'react-bootstrap'
import UserCard from '../UserCard/UserCard'

const UsersList = ({ users }) => {

    return (
        users.map(user => {
            return (
                <Col md={{ span: 6 }} lg={{ span: 6 }} key={user._id}>
                    <UserCard {...user} />
                </Col>
            )
        })
    )
}

export default UsersList