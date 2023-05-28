import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './UserCard.css'

const UserCard = ({ _id, profileImg, firstName, lastName, aboutMe, instrument }) => {
    return (
        <Card className="mb-3 UserCard" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={profileImg} />
            <Card.Body>
                <Card.Title>{firstName} {lastName}</Card.Title>
                <Card.Text>
                    {aboutMe}
                </Card.Text>
                <Card.Text>
                    {instrument}
                </Card.Text>
                <Button as="span" variant="dark">
                    <Link to={`/usuarios/detalles/${_id}`}>Detalles</Link>
                </Button>
            </Card.Body>
        </Card>
    )
}

export default UserCard