import axios from 'axios'

class UserService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/users`
        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getAllUsers() {
        return this.api.get('/getAllUsers')
    }

    userDetails(user_id) {
        return this.api.get(`/${user_id}`)
    }

    userEdit(user_id, userData) {
        return this.api.put(`/${user_id}/edit`, userData)
    }

    userDelete(user_id) {
        return this.api.delete(`/${user_id}/delete`)
    }

    userAddVenue(user_id, venue_id) {
        return this.api.put(`/${user_id}/addVenueFavorite/${venue_id}`)
    }

    userAddFriend(user_id, friend_id) {
        return this.api.put(`/${user_id}/addFriend/${friend_id}`)
    }

    userAssitEvent(user_id, event_id) {
        return this.api.put(`/${user_id}/assitEvent/${event_id}`)
    }

    userChangeRole(user_id, role) {
        return this.api.put(`/${user_id}/changeRole`, { role })
    }
}
const usersService = new UserService()

export default usersService