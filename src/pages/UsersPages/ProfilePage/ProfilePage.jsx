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

    const handleSubmit = e => {
        e.preventDefault()
        usersService
            .userDelete(userView._id)
            .then(() => navigate('/registro'))
            .catch(err => console.log(err))
    }


    return (

        <Container className="profilePage">


            {!userView
                ?
                <Loader />
                :
                <>
                    <h1>¡HOLA, {userView.firstName}!</h1>

                    <hr />
                    <Row>

                        <Col xs={4} md={2}>
                            <img src={userView.avatar} />
                        </Col>

                        <Col className="tabCol" xs={8} md={10}>
                            <Tabs
                                defaultActiveKey="profile"
                                id="profile"
                                className="profileTabs"
                                fill>

                                <Tab className="profileTab" eventKey="profile" title="Mis datos">
                                    <Row>
                                        <Col>

                                            <li><strong>Nombre:</strong> {userView.firstName}</li>
                                            <li><strong>Apellido: </strong>{userView.lastName}</li>
                                            <li><strong>Email:</strong> {userView.email}</li>
                                            <li><strong>Instrumento: </strong>{userView.instrument}          <strong>Nivel:</strong> {userView.level}</li>
                                            <li><strong>Rol: </strong> {userView.role}</li>

                                            <Row>
                                                <li><strong>Sobre mi: </strong>{userView.aboutMe}</li>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Tab>

                                <Tab className="profileTab" eventKey="friends" title="Mis amigos">
                                    Mis amigos
                                    <>  {
                                        !userView.friends
                                            ?
                                            <Loader />
                                            :
                                            userView.friends?.map(f => {
                                                return (
                                                    <Row className="profileCard">
                                                        <Col className="detailsImg" md={{ span: 4 }} key={f._id}>
                                                            <div className="friends">
                                                                <div className="avatar-container">
                                                                    <Link to={`/usuarios/detalles/${f._id}`}>
                                                                        <img className="avatar-friends" src={f.avatar} alt="Avatar" />
                                                                    </Link>
                                                                </div>
                                                                <p className="friendsName">{f.firstName}</p>
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                )
                                            })
                                    }

                                    </>
                                </Tab>

                                <Tab className="profileTab" eventKey="venueFavorites" title="Mis salas favoritas">
                                    Mis salas favoritas
                                    <>  {
                                        !userView.venueFavorites
                                            ?
                                            <Loader />
                                            :
                                            userView.venueFavorites?.map((v) => {
                                                return (
                                                    <Row className="profileCard">
                                                        <Col className="detailsImg" md={{ span: 4 }} key={v._id}>
                                                            <div className="friends">
                                                                <div className="avatar-container">
                                                                    <Link to={`/usuarios/detalles/${v._id}`}>
                                                                        <img className="avatar-friends" src={v.venueImg} alt="Avatar" />
                                                                    </Link>
                                                                </div>
                                                                <p className="friendsName">{v.name}</p>
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                )
                                            })
                                    }

                                    </>
                                </Tab>

                                <Tab className="profileTab" eventKey="eventsAssisted" title="Mis ensayos">
                                    Mis ensayos
                                    <>
                                        {
                                            !userView.eventsAssisted
                                                ?
                                                <Loader />
                                                :
                                                userView.eventsAssisted?.map(e => {
                                                    return (
                                                        <Row className="profileCard">
                                                            <Col md={{ span: 4 }} key={e._id}>
                                                                <li>
                                                                    <Link to={`/eventos/detalles/${e._id}`}>
                                                                        {e.name}
                                                                    </Link>
                                                                </li>
                                                            </Col>
                                                        </Row>
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

            <Row xs={4} md={12}>
                {/* <Col md={{ span: 2 }}>
                    <Link to="/salas">
                        <Button className="profileButton" variant="dark">Cambiar rol</Button>
                    </Link>
                </Col> */}
                <Col md={{ span: 2, offset: 2 }}>
                    <Form onSubmit={handleSubmit}>
                        <Button className="profileButton" variant="dark">Eliminar perfil</Button>
                    </Form>
                </Col>
                <Col md={{ span: 2 }}>
                    <Link to={`/perfil-editar/${user._id}`}>
                        <Form onSubmit={handleSubmit}>
                            <Button className="profileButton" variant="dark">Editar perfil</Button>
                        </Form>
                    </Link>
                </Col>

                {
                    !user ? <></> : user.role === "MANAGER" ?
                        <Col md={{ span: 2 }}>
                            <Link to="/crear-sala">
                                <Button className="profileButton" variant="dark" type="submit">
                                    Crear Sala
                                </Button>
                            </Link>
                        </Col>
                        :
                        <></>

                }

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