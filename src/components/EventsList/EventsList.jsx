import { Col } from "react-bootstrap"
import EventCard from "../EventCard/EventCard"

const EventsList = ({ events }) => {

    return (
        events.map(event => {
            return (
                <Col md={{ span: 3 }} key={event._id} lg={{ span: 4 }}>
                    <EventCard {...event} />
                </Col>
            )
        })
    )
}

export default EventsList