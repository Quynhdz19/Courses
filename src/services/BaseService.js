class BaseService {
  constructor(axios) {
    this.api = axios
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

  async delete(endpoint, config = {}) {
    try {
      const response = await this.api.delete(endpoint, config)
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
