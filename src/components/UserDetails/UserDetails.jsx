import { Button, Card, Row, Col, Form } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import usersService from './../../services/users.services'
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "./../../contexts/auth.context"
import Loader from './../../components/Loader/Loader'

const UserDetails = ({ _id, avatar, firstName, lastName, email, role, instrument, aboutMe, level, friends, venueFavorites, eventsAssisted }) => {

    const { user } = useContext(AuthContext)
    const { id } = useParams()

    const navigate = useNavigate()

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
            .then(() => navigate('/perfil'))
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

        <>
            <h1> {firstName}</h1>
            <Card className="mb-3 UserCard" md={{ span: 6 }} >
                <Row>
                    <Col>
                        <Card.Img md={{ span: 5 }} variant="top" src={avatar} style={{ width: '100%' }} />
                    </Col>
                    <Col>
                        <Card.Title>Datos personales</Card.Title>
                        <ul>
                            <li>Nombre: <strong>{firstName}</strong></li>
                            <li>Apellido: <strong>{lastName}</strong></li>
                            <li>Email: <strong>{email}</strong></li>
                            <li>Rol: <strong>{role}</strong></li>
                            <li>Instrumento: <strong>{instrument}</strong><p>Nivel: <strong>{level}</strong></p></li>
                        </ul>
                        <p>Sobre mí: {aboutMe}</p>
                    </Col>
                </Row>
                <Card>
                    {/* <Row>
                        <p>Nombre:{user.firstName}</p>
                        <p>Apellido:{user.lastName}</p>
                        <p>Instrumento:{user.instrument}</p>
                        <p>Nivel:{user.level}</p>
                        <p>Mis eventos creados:{user.firstName}</p>
                        <p>Mis amigos:{friends}</p>



                        <p>Nivel:{user.level}</p>
                        <p>Mis eventos creados:{user.firstName}</p>
                        <p>Mis amigos:{friends}</p>
                    </Row> */}
                    <Card>
                        <Row>
                            <Col>
                                <Card.Img style={{ width: '10%', height: '10%' }} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqResG0Hteqj7GC0T34B3aIf9K2GMyuhq9SA&usqp=CAU" />
                                <Card.Title>Mis amigos</Card.Title>

                                {
                                    !friends
                                        ?
                                        <Loader />
                                        :
                                        friends?.map(f => {
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
                                    !venueFavorites
                                        ?
                                        <Loader />
                                        :
                                        venueFavorites?.map(v => {
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
                                    !eventsAssisted
                                        ?
                                        <Loader />
                                        :
                                        eventsAssisted?.map(e => {
                                            return (
                                                <li key={e._id}>
                                                    {e.name}
                                                </li>
                                            )
                                        })
                                }

                            </Col>

                        </Row>
                    </Card>

                    <div>
                        <Button as="span" variant="dark">
                            <Link to={`/perfil-editar/${_id}`}>Editar</Link>
                        </Button>

                        {
                            user.role === "ADMIN"
                                ?
                                <Form onSubmit={handleSubmit}>
                                    <Button variant="danger" type="submit">Eliminar perfil</Button>
                                </Form>
                                :
                                <></>
                        }

                        {
                            user.role === "ADMIN"
                                ?
                                <>

                                    {
                                        role === "MANAGER"
                                            ?

                                            <Form onSubmit={handleSubmitRole}>
                                                <Button variant="success" type="submit">Cambiar rol a Músico</Button>
                                            </Form>
                                            :
                                            <Form onSubmit={handleSubmitRole}>
                                                <Button variant="danger" type="submit">Cambiar rol a Manager</Button>
                                            </Form>
                                    }

                                </>
                                :
                                <></>
                        }

                        <Form onSubmit={handleSubmitFavorites}>
                            <Button variant="dark" type="submit">Añadir a Amigos</Button>
                        </Form>

                    </div>



                </Card>
            </Card >
        </>

    )


}

export default UserDetails