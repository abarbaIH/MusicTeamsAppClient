import { Image, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './UserCard.css'

const UserCard = ({ _id, avatar, firstName, lastName, level, aboutMe, instrument }) => {
    return (
        <Row className="justify-content-center">
            <Col md={{ span: 6 }} className="d-flex flex-column align-items-center text-center mb-4">
                <Link to={`/usuarios/detalles/${_id}`}>
                    <div className="user-image">
                        <Image src={avatar} />
                    </div>
                </Link>
                <h1 className="user-name mt-2">{firstName} {lastName}</h1>

                <Row>
                    <Col><p className="user-info" >{instrument} Nivel: {level}</p></Col>
                </Row>

            </Col>
        </Row>
    )
}

export default UserCard

