import axiosInstance from './axios'
import BaseService from './BaseService'

class CourseService extends BaseService {
  async addCourse(formData) {
    try {
      const response = await this.post('/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }

  async getCourse(courseId) {
    try {
      const response = await this.get(`/courses/${courseId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }

  async getCourses(searchParams = {}) {
    try {
      const response = await this.get('/courses', searchParams)
      return response
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }

  async updateCourse(courseId, courseData) {
    try {
      const response = await this.put(`/courses/${courseId}`, courseData)
      return response
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }

  async deleteCourses(coursesData) {
    try {
      const response = await this.delete('/courses/remove-courses', { data: coursesData })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }

  async addUsers(courseId, usersData) {
    try {
      const response = await this.post(`/courses/${courseId}/add-users`, usersData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }

  async getUsers(courseId, searchParams = {}) {
    try {
      const response = await this.get(`/courses/${courseId}/users`, searchParams)
      return response
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }

  async deleteUsers(courseId, usersData) {
    try {
      const response = await this.delete(`/courses/${courseId}/remove-users`, { data: usersData })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }
}

const courseService = new CourseService(axiosInstance)
export default courseService
