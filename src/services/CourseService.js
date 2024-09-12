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

  async getCourses(searchParams) {
    try {
      const response = await this.get('/courses', searchParams)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }

  async addModule(courseId, moduleData) {
    try {
      const response = await this.post(`/courses/${courseId}/modules`, moduleData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }

  async addLesson(moduleId, formData) {
    try {
      const response = await this.post(`/courses/modules/${moduleId}/lessons`, formData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }

  async getUploadPresignedUrl(formData) {
    try {
      const response = await this.post(
        `/courses/modules/lessons/get-upload-presigned-url`,
        formData,
      )
      return response.data
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }

  async getDetailModule(moduleId) {
    try {
      const response = await this.get(`/courses/modules/${moduleId}`)
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
      const response = await this.get(`/courses/${courseId}`, { params: searchParams })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }

  async deleteUsers(courseId, usersData) {
    try {
      const response = await this.delete(`/courses/${courseId}/remove-users`, usersData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data)
    }
  }
}

const courseService = new CourseService(axiosInstance)
export default courseService
