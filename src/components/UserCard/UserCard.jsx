import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './UserCard.css'

const UserCard = ({ _id, avatar, firstName, lastName, aboutMe, instrument }) => {
    return (
        <Card className="mb-3 UserCard" style={{ width: '18rem', background: '#D9BF71' }} bg='#D9BF71' >
            <Card.Img variant="top" src={avatar} />
            <Card.Body>
                <Card.Title>{firstName} {lastName}</Card.Title>
                <Card.Text>
                    {aboutMe}
                </Card.Text>
                <Card.Text>
                    {instrument}
                </Card.Text>
                <Button as="span" className='button-card' variant="dark">
                    <Link to={`/usuarios/detalles/${_id}`}>Detalles</Link>
                </Button>
            </Card.Body>
        </Card>
    )
}

export default UserCard