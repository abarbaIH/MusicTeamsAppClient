import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './VenueCard.css'

const VenueCard = ({ _id, venueImg, name, openingHours, description, eventsList, capacity, features, rating }) => {
    return (
        <Card className="mb-3 VenueCard">
            <Link to={`/salas/detalles/${_id}`}>

                <Card.Img variant="top" src={venueImg} style={{ padding: "30px", borderRadius: "5%" }} />

            </Link>
            <Card.Body>
                <Card.Title className='venueTitle'>{name}</Card.Title>

                <Card.Text className='openingHours'>
                    <ul>
                        <li>
                            <strong>Capacidad: </strong> {capacity} personas
                        </li>
                        <li>
                            <strong>Horario de Apertura: </strong>  {openingHours}
                        </li>
                        <li>
                            <strong>Eventos: </strong> {eventsList?.length}
                        </li>

                    </ul>

                </Card.Text>

                <Link className='info' to={`/salas/detalles/${_id}`}>+Info</Link>

            </Card.Body>
        </Card>
    )
}

export default VenueCard