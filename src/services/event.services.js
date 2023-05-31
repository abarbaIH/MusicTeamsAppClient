import axios from 'axios'

class EventService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/events`
        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getOpenEvents() {
        return this.api.get('/getOpenEvents')
    }
    getClosedEvents() {
        return this.api.get('/getClosedEvents')
    }

    newEvent(eventData) {
        return this.api.post('/newEvent', eventData)
    }

    eventDetails(event_id) {
        return this.api.get(`/${event_id}`)
    }

    eventEdit(event_id, eventData) {
        return this.api.put(`/${event_id}/edit`, eventData)
    }

    eventDelete(event_id) {
        return this.api.delete(`/${event_id}/delete`)
    }

}

const eventsService = new EventService()

export default eventsService