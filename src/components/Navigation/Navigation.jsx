import { useContext } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {
    const { user, logout } = useContext(AuthContext)
    return (

        < Navbar bg="dark" variant="dark" expand="lg" className='mb-5' >
            <Container>
                <Navbar.Brand href="#">MusicTeamsApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as="span">
                            <Link to="/">Inicio</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/usuarios">Lista de usuarios</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/usuarios/detalles/:id">Detalles de usuarios</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/salas">Lista de salas</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/salas/detalles/:id">Detalles sala</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/crear-sala">Crear Sala</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/editar-sala/:id">Editar Sala</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/eventos-abiertos">Eventos Abiertos</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/eventos/detalles/:id">Detalles Evento</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/crear-evento">Crear Evento</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/editar-evento/:id">Editar Evento</Link>
                        </Nav.Link>

                        {
                            user
                                ?
                                <>
                                    <Nav.Link as="span">
                                        <Link to="/perfil">
                                            <img src={user.avatar} style={{ height: "20px" }} alt="" />
                                            ¡Hola, {user.firstName}!
                                        </Link>
                                    </Nav.Link>
                                    <NavDropdown>
                                        <NavDropdown.Item as="span">
                                            <Link to="/perfil">Perfil</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as="span">
                                            <Link to="/perfil-editar/:id">Editar Perfil</Link>
                                        </NavDropdown.Item>

                                        <NavDropdown.Divider />

                                        <NavDropdown.Item as="span" onClick={logout}>
                                            <Link to="/">Cerrar Sesion</Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                                :
                                <>
                                    <Nav.Link as="span">
                                        <Link to="/registro">Registro</Link>
                                    </Nav.Link>

                                    <Nav.Link as="span">
                                        <Link to="/inicio-sesion">Inicio sesión</Link>
                                    </Nav.Link>
                                </>


                        }


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}


export default Navigation


