import { Button, Card, Row, Col, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './EventCard.css'
import Loader from '../Loader/Loader'
import { formatDate } from '../../utils/date-format'
import assitEvent from './../../assets/BotonApuntarEvento.png'
import { AuthContext } from "./../../contexts/auth.context"
import eventsService from "./../../services/event.services"
import { useContext } from "react"

const EventCard = ({ _id, name, musicStyle, requiredExperience, venueEvent, eventDate, planner, assistants, maxPlaces }) => {

    const navigate = useNavigate()
    const { user } = useContext(AuthContext)


    const handleSubmitAddAssistans = e => {
        console.log(_id)
        e.preventDefault()
        eventsService
            .eventAddAssistants(_id, user._id)
            .then(() => navigate('/perfil'))
            .catch(err => console.log(err))
    }

    const renderPlaces = () => {
        const places = []
        const numAssistants = assistants ? assistants.length : 0;
        const remainingPlaces = maxPlaces - numAssistants;

        for (let i = 0; i < numAssistants; i++) {
            const assistant = assistants[i];
            const avatar = assistant ? assistant.avatar : null;
            places.push(
                <div key={_id} className="place-item">
                    <img src={avatar} alt={`Asistente ${i + 1}`} className="assistant-avatar" />
                    <p className="assistant-name mt-3"> <strong>{assistant.firstName}</strong></p>
                    <p className="assistant-instrument font-italic">{assistant.instrument}</p>
                </div>
            );
        }

        for (let i = 0; i < remainingPlaces; i++) {
            places.push(
                <div className="place-item">
                    <Form>
                        <Button onClick={handleSubmitAddAssistans} key={_id} className='assit-button' >
                            <img src={assitEvent} alt='plazas vacías' />
                        </Button>
                    </Form>
                    <p className="free-place mt-3">Libre</p>
                </div>
            );
        }
        return places
    }

    return (
        <Card className="mb-3 w-100 EventCard" style={{ width: '18rem' }}>

            <Card.Body>

                <Card.Title className="mb-5">

                    {!venueEvent ? (
                        <Loader />
                    ) : (

                        <Row className="justify-content-between">
                            <Col><p><strong>{name}</strong></p></Col>
                            <Col><p><strong>{venueEvent.name}</strong></p></Col>
                            <Col>
                                <Button as="span" variant="dark">
                                    <Link to={`/eventos/detalles/${_id}`}>Más detalles</Link>
                                </Button>
                            </Col>
                        </Row>

                    )}
                </Card.Title>

                <Row>
                    <Col>
                        <div className="places-container w-100">{renderPlaces()}</div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card.Text>
                            <strong>Estilo musical: </strong> <p font-italic>{musicStyle}</p>
                        </Card.Text>
                    </Col>

                    <Col>
                        <Card.Text>
                            {!planner ? (
                                <Loader />
                            ) : (<>
                                <strong>Organizado por: </strong> <p font-italic>{planner.firstName}</p>
                            </>
                            )}
                        </Card.Text>
                    </Col>

                    <Col>
                        <Card.Text>
                            <strong>Experiencia recomendada: </strong> <p font-italic>{requiredExperience}</p>
                        </Card.Text>
                    </Col>

                    <Col>
                        <Card.Text>
                            <strong>Fecha de Ensayo: </strong> <p font-italic>{formatDate(eventDate)}</p>
                        </Card.Text>
                    </Col>
                </Row>

            </Card.Body>
        </Card >
    )
}

export default EventCard