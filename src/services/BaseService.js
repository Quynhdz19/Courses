import axios from 'axios';

class BaseService {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://online-course-jimmy.onrender.com/api/v1/',
            timeout: 10000,
        });
    }

    get(endpoint, params) {
        return this.api.get(endpoint, { params });
    }

    post(endpoint, data) {
        return this.api.post(endpoint, data);
    }

    put(endpoint, data) {
        return this.api.put(endpoint, data);
    }

    delete(endpoint) {
        return this.api.delete(endpoint);
    }

    handleError(error) {
        console.error('API Error: ', error);
    }
}

export default BaseService;
