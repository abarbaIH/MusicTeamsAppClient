import { useContext, useEffect, useState } from "react"
import { Container, Row, Modal, Button } from "react-bootstrap"
import venuesService from "./../../../services/venues.services"
import VenuesList from "./../../../components/VenuesList/VenuesList"
import NewVenueForm from "./../../../components/NewVenueForm/NewVenueForm"
import Loader from "./../../../components/Loader/Loader"
import { AuthContext } from "./../../../contexts/auth.context"

const VenuesListPage = () => {

    const [venues, setVenues] = useState()
    const [showModal, setShowModal] = useState(false)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadVenues()
    }, [])

    const loadVenues = () => {
        venuesService
            .getAllVenues()
            .then(({ data }) => setVenues(data))
            .catch(err => console.log(err))
    }

    return (
        <Container>

            <h1>Listado de Salas</h1>

            {
                user && <Button variant="dark" size="sm" onClick={() => setShowModal(true)}>Crear Sala</Button>
            }

            <hr />
            <Row>
                {
                    !venues
                        ?
                        <Loader />
                        :
                        <VenuesList venues={venues} />
                }
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Sala</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewVenueForm closeModal={() => setShowModal(false)} updateList={loadVenues} />
                </Modal.Body>
            </Modal>

        </Container>
    )
}

export default VenuesListPage