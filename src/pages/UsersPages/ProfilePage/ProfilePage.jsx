import { useContext } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../../contexts/auth.context";
import usersService from "../../../services/users.services";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    console.log("hola", user)
    const navigate = useNavigate()

    const handleSubmit = e => {

        e.preventDefault()

        usersService
            .userDelete(user)
            .then(() => navigate('/registro'))
            .catch(err => console.log(err))
    }


    return (

        <Container>
            <h1>¡Holaaaaa, {user.firstName}!</h1>
            <hr />
            <Row>
                <Col xs={6} md={4}>
                    <img src={user.avatar} />
                </Col>
                <Col md={{ span: 6 }}>
                    <h4>
                        <strong>Nombre</strong>
                    </h4>
                    <p>{user.firstName}</p>
                    <h4>
                        <strong>AApellido</strong>
                    </h4>
                    <p>{user.lastName}</p>
                    <h4>
                        <strong>Email</strong>
                    </h4>
                    <p>{user.email}</p>
                    <h4>
                        <strong>Rol</strong>
                    </h4>
                    <p>{user.role}</p>
                    <h4>
                        <strong>Instrumento</strong>
                    </h4>
                    <p>{user.instrument}</p>
                    <h4>
                        <strong>Nivel</strong>
                    </h4>
                    <p>{user.level}</p>
                    <h4>

                        <strong>Sobre mi</strong>
                    </h4>
                    <p>{user.aboutMe}</p>
                    <h4>
                        <strong>Mis ensayos</strong>
                    </h4>
                    <p>{user.eventsCreated}</p>

                    <h4>
                        <strong>Mis salas</strong>
                    </h4>
                    <p>{user.venueFavorites}</p>

                    <h4>
                        <strong>Mis amigos</strong>
                    </h4>
                    <p>{user.friends}</p>
                    <Col />



                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={{ span: 2 }}>
                    <Link to="/salas">
                        <Button variant="primary">Cambiar rol</Button>
                    </Link>
                </Col>
                {/* <Col md={{ span: 2 }}>
                    <Form onSubmit={handleSubmit}>
                        <Button variant="danger" type="submit">Eliminar perfil</Button>
                    </Form>
                </Col>
                <Col md={{ span: 2 }}>
                    <Form onSubmit={handleSubmit}>
                        <Link to={`/perfil-editar/${user.id}`}>Editar</Link>
                        Editar perfil
                    </Form>
                </Col> */}
                <Col md={{ span: 2 }}>
                    <Link to="/crear-sala">
                        <Button variant="dark" style={{ marginBottom: "30px" }} type="submit">
                            Crear Sala
                        </Button>
                    </Link>
                </Col>
                <Col md={{ span: 2 }}>
                    <Link to="/crear-evento">
                        <Button variant="dark" style={{ marginBottom: "30px" }} type="submit">
                            Crear Evento
                        </Button>
                    </Link>
                </Col>
            </Row >
        </Container >

    );
};

export default ProfilePage;