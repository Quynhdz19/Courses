import axiosInstance from './axios'
import BaseService from './BaseService'

class OrderService extends BaseService {
  async addOrder(orderData) {
    try {
      const response = await this.post('/orders', orderData)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async getRegistrationOrder() {
    try {
      const response = await this.get('/orders/pending-by-user')
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async getOrders(searchParams = {}) {
    try {
      const response = await this.get('/orders', searchParams)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }

  async updateOrder(orderId, orderData) {
    try {
      const response = await this.put(`/orders/orders/${orderId}`, orderData)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }
}

const orderService = new OrderService(axiosInstance)
export default orderService
