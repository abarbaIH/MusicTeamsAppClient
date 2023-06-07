import { Container, Row, Col } from 'react-bootstrap'
import LoginForm from '../../../components/LoginForm/LoginForm'
import './LoginPage.css'

const LoginPage = () => {

    return (

        <Container className='loginPage' >

            <Row>

                <Col md={{ offset: 3, span: 6 }}>

                    <h1>Inicio de sesión</h1>

                    <hr />

                    <LoginForm />

                </Col>
            </Row>

        </Container>
    )
}

export default LoginPage