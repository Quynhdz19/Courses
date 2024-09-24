import axiosInstance from './axios'
import BaseService from './BaseService'

class AuthService extends BaseService {
  async signIn(credentials) {
    try {
      const response = await this.post('auth/login', credentials)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }
}

const authService = new AuthService(axiosInstance)
export default authService
