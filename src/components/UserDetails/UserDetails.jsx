import { Button, Card, Row, Col, Form, Image, Container } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import usersService from './../../services/users.services'
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./../../contexts/auth.context"
import Loader from './../../components/Loader/Loader'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './UserDetails.css'
// import { drum } from './../../assets/drum.jpg'

const UserDetails = ({ _id, avatar, firstName, lastName, email, role, instrument, eventsCreated, aboutMe, level, friends, venueFavorites, eventsAssisted }) => {
    console.log(friends)
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const [userView, setUserView] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        loadUserView()
    }, [user])

    const loadUserView = () => {
        usersService
            .userDetails(user._id)
            .then(({ data }) => setUserView(data))
            .catch(err => console.log(err))
    }

    const handleSubmit = e => {

        e.preventDefault()

        usersService
            .userDelete(id)
            .then(() => navigate('/usuarios'))
            .catch(err => console.log(err))
    }

    const handleSubmitFavorites = e => {
        e.preventDefault()
        usersService
            .userAddFriend(user._id, id)
            .then(({ data }) => {
                const updateUser = data
                setUserView(updateUser)
            })
            .catch(err => console.log(err))
    }

    const handleSubmitDeleteFriend = e => {
        e.preventDefault()
        usersService
            .userDeleteFriend(user._id, id)
            .then(({ data }) => {
                const updateUser = data
                setUserView(updateUser)
            })
            .catch(err => console.log(err))
    }

    const handleSubmitRole = e => {
        e.preventDefault()

        const updatedRole = role === "MUSICIAN" ? "MANAGER" : "MUSICIAN";

        usersService
            .userChangeRole(id, updatedRole)
            .then(() => navigate('/usuarios'))
            .catch(err => console.log(err))
    }

    return (

        <Container className="userDetails">
            <Card className=" mt-5 UserCard" md={{ span: 12 }} >
                <Row>
                    <Col className="userImg" md={{ span: 3, offset: 1 }}  >
                        <div className="avatar-container">
                            <img className="avatar" src={avatar} alt="Avatar" />
                        </div>
                    </Col>
                    <Col className="userData" md={{ span: 5 }}>
                        <Card.Title className="mt-4 personal-info"> Datos personales</Card.Title>
                        <ul>
                            <li>Nombre: <strong>{firstName}</strong></li>
                            <li>Apellido: <strong>{lastName}</strong></li>
                            <li>Email: <strong>{email}</strong></li>
                            <li>Instrumento: <strong>{instrument} </strong>Nivel: <strong>{level}</strong></li>
                            {
                                !userView ?
                                    <Loader />
                                    :
                                    <>
                                        <li>Amigos: <strong>{friends?.length}</strong></li>
                                        <li>Ensayos Creados: <strong>{eventsCreated?.length}</strong></li>
                                    </>

                            }

                            {
                                user.role === "ADMIN"
                                &&
                                <li>Rol: <strong>{role}</strong></li>

                            }

                        </ul>

                    </Col>
                    <Col md={{ span: 3 }}>
                        <div>
                            {
                                user.role === "ADMIN"
                                &&
                                <>
                                    <Button className="profileButton" as="span" variant="dark" type="submit">
                                        <Link to={`/perfil-editar/${_id}`}>Editar</Link>
                                    </Button>
                                    <Form onSubmit={handleSubmit}>
                                        <Button className="profileButton" variant="dark" type="submit">Eliminar perfil</Button>
                                    </Form>
                                    {
                                        role === "MANAGER"
                                            ? <Form onSubmit={handleSubmitRole}>
                                                <Button className="profileButton" variant="dark" type="submit">Cambiar rol a Músico</Button>
                                            </Form>
                                            : <Form onSubmit={handleSubmitRole}>
                                                <Button className="profileButton" variant="dark" type="submit">Cambiar rol a Manager</Button>
                                            </Form>
                                    }

                                </>

                            }

                            {
                                !userView
                                    ? <Loader />
                                    : userView.friends.includes(id)
                                        ? <Form onSubmit={handleSubmitDeleteFriend}>
                                            <Button className="profileButton" variant="dark" type="submit">Eliminar de Amigos</Button>
                                        </Form>
                                        : <Form onSubmit={handleSubmitFavorites}>
                                            <Button className="profileButton" variant="dark" type="submit">Añadir a Amigos</Button>
                                        </Form>
                            }
                        </div>

                    </Col>
                    <Row>
                        <Col md={{ offset: 4 }}>
                            <Card.Title className="personal-info" > Sobre mi: </Card.Title>

                            <ul>
                                {aboutMe}
                            </ul>
                        </Col>


                    </Row>
                </Row>

                <Tabs
                    defaultActiveKey="friends"
                    id="profile"
                    className="profileTabs"
                    fill

                >

                    <Tab className="profileTab" eventKey="friends" title="Amigos">
                        {!friends ? (
                            <Loader />
                        ) : (
                            <Row>
                                {/* TODO: DESCAOPLAR CONTENIDO DE TABS */}
                                {friends.map((f) => (
                                    <Col className="userImg" md={{ span: 3 }} key={f._id}>
                                        <div className="friend">
                                            <div className="avatar-container">
                                                <Link to={`/usuarios/detalles/${f._id}`}>
                                                    <img className="avatar" src={f.avatar} alt="Avatar" />
                                                </Link>
                                            </div>
                                            <p className="friendsName">{f.firstName}</p>
                                        </div>
                                    </Col>
                                ))}

                            </Row>
                        )}
                    </Tab>


                    <Tab className="profileTab  horizontal-scroll" eventKey="venueFavorites" title="Salas">
                        {!venueFavorites ? (
                            <Loader />
                        ) : (

                            <Row>
                                {venueFavorites.map((v) => (
                                    <Col className="userImg" md={{ span: 3 }} key={v._id}>
                                        <div className="friend">
                                            <div className="avatar-container">
                                                <Link to={`/salas/detalles/${v._id}`}>
                                                    <img className="avatar" src={v.venueImg} alt="VenueImage" />
                                                </Link>
                                            </div>
                                            <p className="friendsName">{v.name}</p>
                                        </div>
                                    </Col>
                                ))}
                            </Row>

                        )}
                    </Tab>


                    <Tab className="profileTab" eventKey="eventsAssisted" title="Ensayos">

                        <>
                            {!userView ? <Loader /> :
                                !eventsAssisted
                                    ?
                                    <Loader />
                                    :
                                    eventsAssisted?.map(e => {
                                        return (
                                            <Row>
                                                <Col>
                                                    <li key={e._id}>
                                                        <Link to={`/eventos/detalles/${e._id}`}>
                                                            {e.name}
                                                        </Link>
                                                    </li>
                                                </Col>
                                                {/* <Col> <img className="imgEvent" src={drum} alt="Avatar" /></Col> */}
                                            </Row>
                                        )
                                    })
                            }
                        </>
                    </Tab>

                </Tabs>
            </Card >
        </Container >
    )
}

export default UserDetails
