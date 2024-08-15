import axios from 'axios'

const BaseService = axios.create({
  baseURL: 'https://online-course-jimmy.onrender.com/api/v1/',
  timeout: 10000,
})

BaseService.interceptors.request.use(
  (config) => {
    // Add any headers or authentication tokens here if needed
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

BaseService.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - redirecting to login')
    }
    return Promise.reject(error)
  },
)

export default BaseService
