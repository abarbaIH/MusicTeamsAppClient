import { useContext, useEffect, useState } from "react";
import './ProfilePage.css'
import { Container, Button, Row, Col, Form, Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "./../../../contexts/auth.context";
import usersService from "../../../services/users.services";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Loader from "../../../components/Loader/Loader";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const { id } = useParams()

    const [userView, setUserView] = useState()

    useEffect(() => {
        loadUserView()
    }, [])

    const loadUserView = () => {
        usersService
            .userDetails(user._id)
            .then(({ data }) => setUserView(data))
            .catch(err => console.log(err))
    }

    // TODO: HACER LLAMADA A ENPOINT DE API QUE RECIBA EL ID DEL USUARIO Y RETORNE JSOIN CON TODFOS SU DATOS INCLUIDOS AMIGOS POIPULADOS
    const handleSubmit = e => {

        e.preventDefault()

        usersService
            .userDelete(userView._id)
            .then(() => navigate('/registro'))
            .catch(err => console.log(err))
    }


    return (
        <Container className="profilePage" style={{ backgroundImage: "red" }}>


            {!userView
                ?
                <Loader />
                :
                <>
                    <h1>¡Holaaaaa, {userView.firstName}!</h1>

                    <hr />
                    <Row>
                        {/* <Col xs={6} md={6}>
                            <img src={userView.avatar} />
                        </Col> */}

                        <Col xs={6} md={6}>
                            <Tabs
                                defaultActiveKey="profile"
                                id="profile"
                                className="profileTabs"
                                fill
                            >
                                <Tab className="profileTab" eventKey="profile" title="Mis datos">
                                    <Row><Col> <h4><strong>Nombre</strong></h4>
                                        <p>{userView.firstName}</p>
                                        <h4><strong>Apellido</strong></h4>
                                        <p>{userView.lastName}</p>
                                        <h4><strong>Email</strong></h4>
                                        <p>{userView.email}</p>
                                        <Row>
                                            <Col>
                                                <h4><strong>Rol</strong></h4>
                                                <p>{userView.role}</p>
                                            </Col>
                                            <Col> <h4><strong>Instrumento</strong></h4>
                                                <p>{userView.instrument}</p>
                                            </Col>
                                            <Col>
                                                <h4><strong>Nivel</strong></h4>
                                                <p>{userView.level}</p>
                                            </Col>
                                            <h4><strong>Sobre mi</strong></h4>
                                            <p>{userView.aboutMe}</p>
                                        </Row>
                                    </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="friends" title="Mis amigos">
                                    Mis amigos
                                    <>  {
                                        !userView.friends
                                            ?
                                            <Loader />
                                            :
                                            userView.friends?.map(f => {
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
                                        !userView.venueFavorites
                                            ?
                                            <Loader />
                                            :
                                            userView.venueFavorites?.map(v => {
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
                                            !userView.eventsAssisted
                                                ?
                                                <Loader />
                                                :
                                                userView.eventsAssisted?.map(e => {
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
                        </Col>
                    </Row>

                </>

            }

            <hr />

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