import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './VenueCard.css'

const VenueCard = ({ _id, venueImg, name, openingHours, description, features }) => {
    return (
        <Card className="mb-3 VenueCard" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={venueImg} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Card.Text>
                    {features.map(f => {
                        return (
                            <li key={f}>
                                {f}
                            </li>
                        )
                    })}
                </Card.Text>
                <Card.Text>
                    {openingHours}
                </Card.Text>
                <Button as="span" variant="dark">
                    <Link to={`/salas/detalles/${_id}`}>Detalles</Link>
                </Button>
            </Card.Body>
        </Card>
    )
}

export default VenueCard