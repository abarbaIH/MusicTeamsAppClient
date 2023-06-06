import React from 'react'

import { Container } from 'react-bootstrap'
import UserEditForm from '../../../components/UserEditForm/UserEditForm'


const EditProfilePage = () => {


    return (
        <Container>
            <h1>EDITAR PERFIL</h1>
            <hr />
            <UserEditForm />
        </Container>
    )

}

export default EditProfilePage
