import { Col } from "react-bootstrap"
import EventCard from "../EventCard/EventCard"

const EventsList = ({ events }) => {
    return (
        <>
            {events.map(event => (
                <Col md={{ span: 10 }} key={event._id} lg={{ span: 10 }}>
                    <EventCard {...event} />
                </Col>
            ))}
        </>
    )
}

export default EventsList