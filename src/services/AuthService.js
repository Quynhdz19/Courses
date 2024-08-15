import BaseService from './BaseService'
import { useNavigate } from 'react-router-dom'

const AuthService = {
  login: async (username, password) => {
    try {
      const response = await BaseService.post('auth/login', {
        username: username,
        password: password,
      })
      if (response.data.data.code === 'ok') {
        localStorage.setItem('token', response.data.data.accessToken)
        return { success: true, data: response.data }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' }
    }
  },

  logout: () => {
    localStorage.removeItem('token')
  },
}

export default AuthService
