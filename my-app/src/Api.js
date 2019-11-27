import axios from 'axios'

class API {
    constructor(baseURL) {
        this.client = axios.create({ baseURL: baseURL })
    }

    requestToken(token) {
        return this.client.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
    }
}

export default new API('http://127.0.0.1:5000')