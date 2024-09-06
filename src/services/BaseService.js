import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { onLogOut } from 'src/redux/action'
import store from 'src/redux/store'

export const AxiosAuth = axios.create({
    timeout: 10000,
    baseURL: import.meta.env.VITE_BASE_API_URL + '/api/v1/',
})

AxiosAuth.interceptors.request.use(
    (config) => {
        const { auth } = store.getState()
        const { accessToken } = auth.account

        if (accessToken) {
            const currentDate = new Date()
            const decodedAccessToken = jwtDecode(accessToken)

            if (decodedAccessToken?.exp > currentDate.getTime() / 1000) {
                config.headers['Authorization'] = `Bearer ${accessToken}`
            } else {
                store.dispatch(onLogOut())
                throw new axios.Cancel('Token expired, logging out...')
            }
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

AxiosAuth.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            store.dispatch(onLogOut())
        }
        return Promise.reject(error)
    }
)

class BaseService {
    constructor() {
        this.api = AxiosAuth
    }

    async get(endpoint, params) {
        try {
            const response = await this.api.get(endpoint, { params })
            return response.data
        } catch (error) {
            this.handleError(error)
        }
    }

    async post(endpoint, data, config = {}) {
        try {
            const response = await this.api.post(endpoint, data, config)
            return response.data
        } catch (error) {
            this.handleError(error)
        }
    }

    async put(endpoint, data) {
        try {
            const response = await this.api.put(endpoint, data)
            return response.data
        } catch (error) {
            this.handleError(error)
        }
    }

    async delete(endpoint) {
        try {
            const response = await this.api.delete(endpoint)
            return response.data
        } catch (error) {
            this.handleError(error)
        }
    }

    handleError(error) {
        console.error('API Error: ', error)
    }
}

export default BaseService


