import { Container, Row, Col, Card } from 'react-bootstrap'
import SignupForm from './../../../components/SingnupForm/SingnupForm'
import './SignupPage.css'

const SignupPage = () => {
    return (

        <Container className='signupPage'>
            <Row>

                <Col md={{ offset: 3, span: 6 }}>

                    <h1>Pagina de registro</h1>

                    <hr />

                    <SignupForm />

                </Col>
            </Row>

        </Container>
    )
}

export default SignupPage