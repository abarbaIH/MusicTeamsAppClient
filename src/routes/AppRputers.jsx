import { Routes, Route } from "react-router-dom"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<h1> Pagina de Inicio</h1>} />
            <Route path="/usuarios" element={<h1> Pagina Lista de usuarios</h1>} />
            <Route path="/usuarios/detalles/:id" element={<h1> Pagina de Detalles de usuarios</h1>} />
            <Route path="/salas" element={<h1> Pagina de Lista de salas</h1>} />
            <Route path="/salas/detalles/:id" element={<h1> Pagina de detalles sala</h1>} />
            <Route path="/crear-sala" element={<h1> Pagina de Crear sala</h1>} />
            <Route path="/editar-sala/:id" element={<h1> Pagina de editar sala</h1>} />
            <Route path="/eventos-abiertos" element={<h1> Pagina de Eventos abiertos</h1>} />
            <Route path="/eventos/detalles/:id" element={<h1> Pagina detalles eventos</h1>} />
            <Route path="/crear-evento" element={<h1> Pagina de crear eventos</h1>} />
            <Route path="/editar-evento/:id" element={<h1>Pagina de Editar Evento</h1>} />
            <Route path="/registro" element={<h1>Pagina de Registro</h1>} />
            <Route path="/inicio-sesion" element={<h1>Pagina de Inicio Sesion</h1>} />
            <Route path="/perfil" element={<h1>Pagina de Perfil</h1>} />
            <Route path="/perfil-editar/:id" element={<h1>Pagina de Editar Perfil</h1>} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    )
}

export default AppRoutes