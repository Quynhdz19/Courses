import axiosInstance from './axios'
import BaseService from './BaseService'
import CourseService from "src/services/CourseService";

class UserService extends BaseService {
  async addUser(formData) {
    try {
      const response = await this.post('/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }

  async getUser(userId) {
    try {
      const response = await this.get(`/users/${userId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }

  async getUsers(searchParams) {
    try {
      const response = await this.get('/users', searchParams)
      return response
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }

  async updateUser(userId, formData) {
    try {
      const response = await this.put(`/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }


  async getCourses() {
    try {
      const response = await this.get(`/users/courses`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }

  async getDetailCourse(courseId) {
    try {
      const response = await this.get(`/users/courses/${courseId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }

  async deleteUser(userId) {
    try {
      const response = await this.delete(`/users/${userId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }
}

const CourseServiceuserService = new UserService(axiosInstance)
export default userService
