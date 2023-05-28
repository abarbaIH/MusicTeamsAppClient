import axios from 'axios'

class UserService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/users`
        })
    }

    getAllUsers() {
        return this.api.get('/getAllUsers')
    }
}


const usersService = new UserService()
export default usersService