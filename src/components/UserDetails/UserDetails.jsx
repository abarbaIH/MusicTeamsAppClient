import { Button, Card, Row, Col, Form, Container } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import usersService from './../../services/users.services'

const UserDetails = ({ user }) => {

    const { id } = useParams()
    const navigate = useNavigate()

    const handleSubmit = e => {

        e.preventDefault()

        console.log(id)
        usersService
            .userDelete(id)
            .then(() => navigate('/usuarios'))
            .catch(err => console.log(err))
    }
    return (

        <>
            <h1> {user.firstName}</h1>
            <hr></hr>
            <Card className="mb-3 UserCard" md={{ span: 6 }} >
                <Row>
                    <Col>
                        <Card.Img md={{ span: 5 }} variant="top" src={user.avatar} style={{ width: '100%' }} />
                    </Col>
                    <Col>
                        <Card.Title>Datos personales</Card.Title>
                        <ul>
                            <li>Nombre: <strong>{user.firstName}</strong></li>
                            <li>Apellido: <strong>{user.lastName}</strong></li>
                            <li>Email: <strong>{user.email}</strong></li>
                            <li>Rol: <strong>{user.role}</strong></li>
                            <li>Instrumento: <strong>{user.instrument}</strong><p>Nivel: <strong>{user.level}</strong></p></li>
                        </ul>
                        <p>Sobre mí: {user.aboutMe}</p>
                    </Col>
                </Row>
                <Card>
                    {/* <Row>
                        <p>Nombre:{user.firstName}</p>
                        <p>Apellido:{user.lastName}</p>
                        <p>Instrumento:{user.instrument}</p>
                        <p>Nivel:{user.level}</p>
                        <p>Mis eventos creados:{user.firstName}</p>
                        <p>Mis amigos:{user.favorites}</p>



                        <p>Nivel:{user.level}</p>
                        <p>Mis eventos creados:{user.firstName}</p>
                        <p>Mis amigos:{user.favorites}</p>
                    </Row> */}

                    <Container>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Img style={{ width: '10%', height: '10%' }} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqResG0Hteqj7GC0T34B3aIf9K2GMyuhq9SA&usqp=CAU" />
                                    <Card.Title>Mis amigos</Card.Title>
                                    {/* <p>{user.favorites.map(f => {
                                    return (
                                        <li key={f}>
                                            {f}
                                        </li>
                                    )
                                })}</p> */}
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Img style={{ width: '10%', height: '10%' }} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqResG0Hteqj7GC0T34B3aIf9K2GMyuhq9SA&usqp=CAU" />
                                    <Card.Title>Mis ensayos</Card.Title>
                                    {/* <p>{user.eventsAssisted.map(ev => {
                                    return (
                                        <li key={ev}>
                                            {ev}
                                        </li>
                                    )
                                })}</p> */}
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Img style={{ width: '10%', height: '10%' }} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqResG0Hteqj7GC0T34B3aIf9K2GMyuhq9SA&usqp=CAU" />
                                    <Card.Title>Mis salas favoritas</Card.Title>
                                    {/* <p>{user.venueFavorites.map(v => {
                                    return (
                                        <li key={v}>
                                            {v}
                                        </li>
                                    )
                                })}</p> */}
                                </Card>
                            </Col>
                        </Row>

                    </Container>
                    <Row>
                        <Col><Button as="span" variant="dark">
                            <Link to={`/perfil-editar/${user._id}`}>Editar</Link>
                        </Button>
                        </Col>
                        <Col><Form onSubmit={handleSubmit}>
                            <Button variant="danger" type="submit">Eliminar perfil</Button>
                        </Form>
                        </Col>
                        <Col>
                            {/* además botón para el admin cambiar role */}
                            <Button variant="dark">Cambiar rol</Button>
                        </Col>
                    </Row>
                </Card>
            </Card >
        </>

    )


}

export default UserDetails