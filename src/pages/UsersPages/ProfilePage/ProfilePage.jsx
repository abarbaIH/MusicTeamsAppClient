import { useContext } from "react";
import './ProfilePage.css'
import { Container, Button, Row, Col, Form, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../../contexts/auth.context";
import usersService from "../../../services/users.services";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Loader from "../../../components/Loader/Loader";



const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleSubmit = e => {

        e.preventDefault()

        usersService
            .userDelete(user)
            .then(() => navigate('/registro'))
            .catch(err => console.log(err))
    }


    return (
        <Container className="profilePage" style={{ backgroundImage: "red" }}>
            <h1>¡Holaaaaa, {user.firstName}!</h1>
            <hr />
            <Row>
                <Col xs={6} md={6}>
                    <img src={user.avatar} />
                </Col>

                <Col xs={6} md={6}>
                    <Tabs
                        defaultActiveKey="profile"
                        id="profile"
                        className="profileTabs"
                        fill
                    >
                        <Tab className="profileTab" eventKey="profile" title="Mis datos">
                            <Row><Col> <h4><strong>Nombre</strong></h4>
                                <p>{user.firstName}</p>
                                <h4><strong>Apellido</strong></h4>
                                <p>{user.lastName}</p>
                                <h4><strong>Email</strong></h4>
                                <p>{user.email}</p>
                                <Row>
                                    <Col>
                                        <h4><strong>Rol</strong></h4>
                                        <p>{user.role}</p>
                                    </Col>
                                    <Col> <h4><strong>Instrumento</strong></h4>
                                        <p>{user.instrument}</p>
                                    </Col>
                                    <Col>
                                        <h4><strong>Nivel</strong></h4>
                                        <p>{user.level}</p>
                                    </Col>
                                    <h4><strong>Sobre mi</strong></h4>
                                    <p>{user.aboutMe}</p>
                                </Row>
                            </Col>
                            </Row>
                        </Tab>

                        <Tab eventKey="friends" title="Mis amigos">
                            Mis amigos
                            <>
                                {
                                    !user.friends
                                        ?
                                        <Loader />
                                        :
                                        user.friends?.map(f => {
                                            return (
                                                <li key={f._id}>
                                                    {f.firstName}
                                                </li>
                                            )
                                        })
                                }
                            </>
                        </Tab>
                        <Tab eventKey="venueFavorites" title="Mis salas favoritas">
                            Mis salas favoritas
                            <>  {
                                !user.venueFavorites
                                    ?
                                    <Loader />
                                    :
                                    user.venueFavorites?.map(v => {
                                        return (
                                            <li key={v._id}>
                                                {v.name}
                                            </li>
                                        )
                                    })
                            }

                            </>
                        </Tab>
                        <Tab eventKey="eventsAssisted" title="Mis ensayos">
                            Mis ensayos
                            <>
                                {
                                    !user.eventsAssisted
                                        ?
                                        <Loader />
                                        :
                                        user.eventsAssisted?.map(e => {
                                            return (
                                                <li key={e._id}>
                                                    {e.name}
                                                </li>
                                            )
                                        })
                                }
                            </>
                        </Tab>

                    </Tabs>
                    <Row>

                    </Row>


                </Col>
            </Row>
            <hr />

            {/* <Card>
                <Row>
                    <Col>
                        <Card.Img style={{ width: '10%', height: '10%' }} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqResG0Hteqj7GC0T34B3aIf9K2GMyuhq9SA&usqp=CAU" />
                        <Card.Title>Mis amigos</Card.Title>

                        {
                            !user.friends
                                ?
                                <Loader />
                                :
                                user.friends?.map(f => {
                                    return (
                                        <li key={f._id}>
                                            {f.firstName}
                                        </li>
                                    )
                                })
                        }

                    </Col>
                    <Col>
                        <Card.Img style={{ width: '10%', height: '10%' }} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqResG0Hteqj7GC0T34B3aIf9K2GMyuhq9SA&usqp=CAU" />
                        <Card.Title>Mis Salas favoritas</Card.Title>

                        {
                            !user.venueFavorites
                                ?
                                <Loader />
                                :
                                user.venueFavorites?.map(v => {
                                    return (
                                        <li key={v._id}>
                                            {v.name}
                                        </li>
                                    )
                                })
                        }


                    </Col>
                    <Col>
                        <Card.Img style={{ width: '10%', height: '10%' }} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqResG0Hteqj7GC0T34B3aIf9K2GMyuhq9SA&usqp=CAU" />
                        <Card.Title>Mis eventos</Card.Title>

                        {
                            !user.eventsAssisted
                                ?
                                <Loader />
                                :
                                user.eventsAssisted?.map(e => {
                                    return (
                                        <li key={e._id}>
                                            {e.name}
                                        </li>
                                    )
                                })
                        }

                    </Col>

                </Row>
            </Card> */}
            <Row>
                <Col md={{ span: 2 }}>
                    <Link to="/salas">
                        <Button className="profileButton" >Cambiar rol</Button>
                    </Link>
                </Col>
                <Col md={{ span: 2 }}>
                    <Form onSubmit={handleSubmit}>
                        <Button className="profileButton" type="dark">Eliminar perfil</Button>
                    </Form>
                </Col>
                <Col md={{ span: 2 }}>
                    <Link to={`/perfil-editar/${user.id}`}>
                        <Form onSubmit={handleSubmit}>
                            <Button className="profileButton" type="dark">Editar perfil</Button>
                        </Form>
                    </Link>
                </Col>
                <Col md={{ span: 2 }}>
                    <Link to="/crear-sala">
                        <Button className="profileButton" variant="dark" type="submit">
                            Crear Sala
                        </Button>
                    </Link>
                </Col>
                <Col md={{ span: 2 }}>
                    <Link to="/crear-evento">
                        <Button className="profileButton" variant="dark" style={{ marginBottom: "30px" }} type="submit">
                            Crear Evento
                        </Button>
                    </Link>
                </Col>
            </Row >
        </Container >
    );
};

export default ProfilePage;