import { Col } from "react-bootstrap"
import VenueCard from "./../VenueCard/VenueCard"

const VenuesList = ({ venues }) => {

    return (
        venues.map(venue => {
            return (
                <Col md={{ span: 3 }} key={venue._id} lg={{ span: 3 }}>
                    <VenueCard {...venue} />
                </Col>
            )
        })
    )
}

export default VenuesList