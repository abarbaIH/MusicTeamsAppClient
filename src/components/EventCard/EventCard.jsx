import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './EventCard.css'

const EventCard = ({ _id, name, musicStyle, requiredExperience, venueEvent, eventDate, planner, assistants }) => {
    return (
        <Card className="mb-3 EventCard" style={{ width: '18rem' }}>
            {/* <Card.Img variant="top" src={venueImg} /> */}
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {musicStyle}
                </Card.Text>
                <Card.Text>
                    {assistants.map(a => {
                        return (
                            <li key={a}>
                                {a}
                            </li>
                        )
                    })}
                </Card.Text>
                <Card.Text>
                    {venueEvent}
                </Card.Text>
                <Card.Text>
                    {planner}
                </Card.Text>
                <Card.Text>
                    {requiredExperience}
                </Card.Text>
                <Card.Text>
                    {eventDate}
                </Card.Text>
                <Button as="span" variant="dark">
                    <Link to={`/eventos/detalles/${_id}`}>Detalles</Link>
                </Button>
            </Card.Body>
        </Card>
    )
}

export default EventCard