import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import UsersListPage from "../pages/UsersPages/UsersListPage/UsersListPage"
import UserDetailsPage from "../pages/UsersPages/UserDetailsPage/UserDetailsPage"
import VenuesListPage from "../pages/VenuesPages/VenuesListPage/VenuesListPage"
import VenueDetailsPage from "../pages/VenuesPages/VenueDetailsPage/VenueDetailsPage"
import NewVenuePage from "../pages/VenuesPages/NewVenuePage/NewVenuePage"
import EditVenuePage from "../pages/VenuesPages/EditVenuePage/EditVenuePage"
import OpenEventsListPage from "../pages/EventsPages/OpenEventsListPage/OpenEventsListPage"
import EventDetailsPage from "../pages/EventsPages/EventDetailsPage/EventDetailsPage"
import NewEventPage from "../pages/EventsPages/NewEventPage/NewEventPage"
import EditEventPage from "../pages/EventsPages/EditEventPage/EditEventPage"
import SignupPage from "../pages/AuthPages/SignupPage/SignupPage"
import LoginPage from "../pages/AuthPages/LoginPage/LoginPage"
import ProfilePage from "../pages/UsersPages/ProfilePage/ProfilePage"
import EditProfilePage from "../pages/UsersPages/EditProfilePage/EditProfilePage"
import PrivateRoute from "./PrivateRoute"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={< HomePage />} />
            <Route path="/usuarios" element={<UsersListPage />} />
            <Route path="/usuarios/detalles/:id" element={< UserDetailsPage />} />
            <Route path="/salas" element={< VenuesListPage />} />
            <Route path="/salas/detalles/:id" element={<VenueDetailsPage />} />
            <Route path="/crear-sala" element={<NewVenuePage />} />
            <Route path="/editar-sala/:id" element={<EditVenuePage />} />
            <Route path="/eventos-abiertos" element={<OpenEventsListPage />} />
            <Route path="/eventos/detalles/:id" element={<EventDetailsPage />} />
            <Route path="/crear-evento" element={<NewEventPage />} />
            <Route path="/editar-evento/:id" element={<EditEventPage />} />
            <Route path="/registro" element={<SignupPage />} />
            <Route path="/inicio-sesion" element={<LoginPage />} />

            <Route path="/perfil" element={< PrivateRoute />}>
                <Route path="" element={<ProfilePage />} />
            </Route>

            <Route path="/perfil-editar/:id" element={<EditProfilePage />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    )
}

export default AppRoutes