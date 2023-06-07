import axios from 'axios'

class VenueService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/venues`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getAllVenues() {
        return this.api.get('/getAllVenues')
    }

    newVenue(venueData) {
        return this.api.post('/newVenue', venueData)
    }

    venueDetails(venue_id) {
        return this.api.get(`/${venue_id}`)
    }

    venueEdit(venue_id, venueData) {
        return this.api.put(`/${venue_id}/edit`, venueData)
    }

    venueDelete(venue_id) {
        return this.api.delete(`/${venue_id}/delete`)
    }

    checkAvailability(venue_id, requested_date) {
        // console.log('----- CHECK', { AXIOSINFO: this.api })
        return this.api.get(`/${venue_id}/checkAvailability/${requested_date}`)
    }

}

const venuesService = new VenueService()

export default venuesService