import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'

import { UserContext } from "../../contexts/user.context"

const EditProfilePage = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    // const { userEdit, userDetails } = useContext(UserContext)

    const [userData, setUserData] = useState({

        firstName: '',
        // lastName: '',
        // avatar: '',
        // aboutMe: '',
        // instrument: '',
        // level: '',
        // venueFavorites: '',
        // friends: '',
        email: ''
        // role: '',

    })

    const { firstName, email } = userData

    useEffect(() => {
        userDetails(id)
            .then(({ data }) => {
                const {
                    firstName, email
                } = data
                const userEdit = {
                    firstName, email
                }
                setUserData(userEdit)

            })
            .catch(err => console.log(err))
    }, [])

    const handleInputChange = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }
    const handleSubmit = e => {
        e.preventDefaul()
        userEdit(id, userData)
        navigate('/profile')
    }

    return (
        <Container>

            < div > EDIT PROFILE PAGEEEE</div >
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="fis">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={firstName} onChange={handleInputChange} name="firstName" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fis">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
                </Form.Group>

                <div className="d-grid">
                    <Button variant="dark" type="submit">Guardar cambios editados</Button>
                </div>
            </Form>
        </Container>
    )

}

export default EditProfilePage