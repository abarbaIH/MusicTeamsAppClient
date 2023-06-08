import { useContext, useEffect, useState } from "react"
import { Container, Row, Modal, Button, Col } from "react-bootstrap"
import venuesService from "./../../../services/venues.services"
import VenuesList from "./../../../components/VenuesList/VenuesList"
import NewVenueForm from "./../../../components/NewVenueForm/NewVenueForm"
import Loader from "./../../../components/Loader/Loader"
import { AuthContext } from "./../../../contexts/auth.context"
import './VenuesListPage.css'
import VenuesSearch from './../../../components/VenuesSearch/VenuesSearch'
import VenuesCapacitySearch from './../../../components/VenuesCapacitySearch/VenuesCapacitySearch'
import VenuesFeatureSearch from '../../../components/VenuesFeatureSearch/VenuesFeatureSearch'

const VenuesListPage = () => {

    const [venues, setVenues] = useState([])
    const [filteredVenues, setFilteredVenues] = useState([])
    const [showModal, setShowModal] = useState(false)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadVenues()
    }, [])

    const loadVenues = () => {
        venuesService
            .getAllVenues()
            .then(({ data }) => {
                setVenues(data)
                setFilteredVenues(data)
            })
            .catch(err => console.log(err))
    }

    // TODO: FILTRAR EN API
    const filterVenuesByName = name => {
        const filteredVenues = venues.filter(venue => venue.name.includes(name))
        setFilteredVenues(filteredVenues)
    }

    const filterVenuesByCapacity = capacity => {
        const filteredVenues = venues.filter(venue => venue.capacity === capacity)
        setFilteredVenues(filteredVenues)
    }

    const filterVenuesByFeature = feature => {
        const filteredVenues = venues.filter(venue => {
            return venue.features.some(f => f === feature);
        });
        setFilteredVenues(filteredVenues);
    };

    return (
        <Container className="VenuesListPage mb-4">

            <h1>SALAS DE ENSAYO</h1>
            <hr />

            <Row className="venuesFilter">
                <Col md={{ span: 4 }}>
                    <VenuesSearch filterVenuesByName={filterVenuesByName} />

                </Col>
                <Col md={{ span: 4 }}>
                    <VenuesCapacitySearch filterVenuesByCapacity={filterVenuesByCapacity} />

                </Col>
                <Col md={{ span: 4 }}>
                    <VenuesFeatureSearch filterVenuesByFeature={filterVenuesByFeature} />

                </Col>
            </Row>


            {/* {user && (
                <Button className='venuesButton' variant="dark" onClick={() => setShowModal(true)}>
                    Crear Sala
                </Button>
            )} */}

            {
                !user ? <></> : user.role === "MANAGER" ?
                    <Button className='venuesButton' variant="dark" onClick={() => setShowModal(true)}>
                        Crear Sala
                    </Button>
                    :
                    <></>
            }

            <Row>
                {venues.length === 0 ? (
                    <Loader />
                ) : (
                    <VenuesList venues={filteredVenues} />
                )}
            </Row>

            <Modal className='modal-form' show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Sala</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewVenueForm fireFinalActions={() => {
                        loadVenues()
                        setShowModal(false)
                    }} />
                </Modal.Body>
            </Modal>

        </Container>
    )
}

export default VenuesListPage

