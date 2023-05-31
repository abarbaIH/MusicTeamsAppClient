import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import usersService from "../../../services/users.services"
import { Container, Button, Card, Row, Col } from "react-bootstrap"


const UserDetailsPage = () => {

    const { id } = useParams()

    const [user, setUser] = useState({})

    useEffect(() => {
        usersService
            .userDetails(id)
            .then(({ data }) => setUser(data))
            .catch(err => console.log(err))
    }, [])

    return (
        !user
            ?
            <h1>CARGANDO...</h1>
            :
            <Container>

                <h1> {user.firstName}</h1>

                <Card md={{ span: 6 }}>
                    <Card className="mb-3 UserCard" >
                        <Row>
                            <Col md={{ span: 6 }}>
                                <Card.Img style={{ widdt: '50%', height: '100%' }} variant="top" src={user.avatar} />
                            </Col>
                            <Col>
                                <Card.Title>{user.firstName}</Card.Title>
                            </Col>
                        </Row>
                        <Card.Body>

                            <Card>
                                <p>Nombre:{user.firstName}</p>
                                <p>Apellido:{user.lastName}</p>
                                <p>Instrumento:{user.instrument}</p>
                                <p>Nivel:{user.level}</p>
                                <p>Mis eventos creados:{user.firstName}</p>
                                <p>Mis amigos:{user.favorites}</p>
                            </Card>
                            <div className="d-grid">
                                <Button as="span" variant="dark">
                                    <Link to={`/perfil-editar/${id}`}>Editar</Link>
                                </Button>

                                <Button variant="primary">Eliminar perfil</Button>
                                <div className="d-grid"></div>
                                {/* además botón para el admin cambiar role */}
                                <Button variant="primary">Cambiar rol</Button>
                                <div className="d-grid">
                                </div>
                            </div>

                        </Card.Body>
                    </Card>
                </Card>

            </Container >
    )
}

export default UserDetailsPage