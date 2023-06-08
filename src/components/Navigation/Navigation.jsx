import { useContext } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import logo from './../../assets/MusicTeamsAppLogo.png'
import './Navigation.css'
import Loader from '../Loader/Loader'

const Navigation = () => {
    const { user, logout } = useContext(AuthContext)
    return (

        < Navbar className='navbar' expand="lg"  >
            <Container>
                <Navbar.Brand className='nav-text' href="/">
                    <img src={logo} style={{ width: "80px", marginRight: "20px" }} alt="" />

                    MusicTeamsApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as="span">
                            <Link to="/">Inicio</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/usuarios">Músicos</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/salas">Salas de Ensayo</Link>
                        </Nav.Link>

                        {!user
                            ?
                            <></>

                            :
                            user.role === "MANAGER"
                                ?
                                <Nav.Link as="span">
                                    <Link to="/crear-sala">Crear Sala</Link>
                                </Nav.Link>
                                :
                                <></>

                        }





                        <Nav.Link as="span">
                            <Link to="/eventos-abiertos">Ensayos Abiertos</Link>
                        </Nav.Link>

                        <Nav.Link as="span">
                            <Link to="/crear-evento">Crea tu Ensayo</Link>
                        </Nav.Link>

                        {
                            user
                                ?
                                <>
                                    <Nav.Link as="span">
                                        <Link to="/perfil">
                                            <img src={user.avatar} style={{ width: "30px", borderRadius: "50%", marginRight: "20px" }} alt="" />
                                            ¡Hola, <strong>{user.firstName}! </strong>
                                        </Link>
                                    </Nav.Link>

                                    <NavDropdown >
                                        <NavDropdown.Item as="span" className='nav-dropdown'>
                                            <Link to="/perfil">Perfil</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as="span" className='nav-dropdown'>
                                            <Link to={`/perfil-editar/${user._id}`}>Editar Perfil</Link>
                                        </NavDropdown.Item>


                                        <NavDropdown.Divider className='nav-dropdown-divider' />

                                        <NavDropdown.Item as="span" onClick={logout} className='nav-dropdown'>
                                            <Link to="/" className='nav-dropdown'> Cerrar Sesion</Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                                :
                                <>
                                    <Nav.Link as="span" className='nav-dropdown'>
                                        <Link to="/registro">Registro</Link>
                                    </Nav.Link>

                                    <Nav.Link as="span" className='nav-dropdown'>
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


