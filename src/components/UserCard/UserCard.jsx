import { Image, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './UserCard.css'

const UserCard = ({ _id, avatar, firstName, lastName, level, aboutMe, instrument, role }) => {
    return (
        <Row className="justify-content-center p-2">
            <Col md={{ span: 12 }} className="d-flex flex-column align-items-center text-center mb-4 custom-row">
                <Link to={`/usuarios/detalles/${_id}`}>
                    <div className="user-image">
                        <Image src={avatar} />
                    </div>
                </Link>

                <Row>
                    <h3 className="user-name">{firstName}</h3>
                    <p className="user-info" >{instrument}</p>
                    <p className="user-info" >Nivel: {level}</p>

                </Row>

            </Col>
        </Row>
    )
}

export default UserCard

