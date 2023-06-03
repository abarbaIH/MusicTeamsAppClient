import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './EventCard.css'
import Loader from '../Loader/Loader'
import { formatDate } from '../../utils/date-format'

const EventCard = ({ _id, name, musicStyle, requiredExperience, venueEvent, eventDate, planner, assistants }) => {
    return (
        <Card className="mb-3 EventCard" style={{ width: '18rem' }}>
            {/* <Card.Img variant="top" src={venueImg} /> */}
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    Estilo musical:{musicStyle}
                </Card.Text>

                <Card.Text>
                    {!planner
                        ?
                        <Loader />
                        :
                        <p>Organizado por:{planner.firstName}</p>
                    }
                </Card.Text>

                <Card.Text>

                    {
                        !venueEvent
                            ?
                            <Loader />
                            :
                            <p>En la sala:{venueEvent.name}</p>
                    }
                </Card.Text>

                <Card.Text>
                    {
                        !assistants
                            ?
                            <Loader />
                            :
                            assistants?.map(a => {
                                return (
                                    <li key={a._id}>
                                        {a.firstName}
                                    </li>
                                )
                            })
                    }
                </Card.Text>


                <Card.Text>
                    {requiredExperience}
                </Card.Text>

                <Card.Text>
                    {formatDate(eventDate)}
                </Card.Text>

                <Button as="span" variant="dark">
                    <Link to={`/eventos/detalles/${_id}`}>Detalles</Link>
                </Button>
            </Card.Body>
        </Card>
    )
}

// let date = new Date("2018-01-01T00:00:00");
// /* Date format you have */
// let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
// /* Date converted to MM-DD-YYYY format */

export default EventCard