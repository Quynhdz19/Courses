import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import store from 'src/redux/store'
import { logout, setAuthAccessToken } from '../redux/modules/authSlice'

const refreshTokenInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
})

const axiosInstance = axios.create({
  timeout: 10000,
  baseURL: import.meta.env.VITE_BASE_API_URL,
})

let isRefreshing = false
const refreshSubscribers = []

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb)
}

const onRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((cb) => cb(newAccessToken))
  refreshSubscribers.length = 0
}

const onFailedRefreshed = (error) => {
  refreshSubscribers.forEach((cb) => cb(null, error))
  refreshSubscribers.length = 0
}

axiosInstance.interceptors.request.use(
  async (config) => {
    const { auth } = store.getState()
    const accessToken = auth.accessToken
    const refreshToken = auth.refreshToken

    if (accessToken) {
      const currentDate = new Date()
      const decodedAccessToken = jwtDecode(accessToken)

      if (decodedAccessToken?.exp <= currentDate.getTime() / 1000) {
        if (!isRefreshing) {
          isRefreshing = true

          try {
            const response = await refreshTokenInstance.post('/auth/refresh-token', {
              refreshToken: refreshToken,
            })

            const newAccessToken = response.data.accessToken

            store.dispatch(setAuthAccessToken(newAccessToken))

            config.headers['Authorization'] = `Bearer ${newAccessToken}`

            isRefreshing = false

            onRefreshed(newAccessToken)
          } catch (error) {
            isRefreshing = false
            store.dispatch(logout())
            onFailedRefreshed(error)
            return Promise.reject(error)
          }
        }

        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((newAccessToken, error) => {
            if (error) {
              reject(error)
            } else {
              config.headers['Authorization'] = `Bearer ${newAccessToken}`
              resolve(config)
            }
          })
        })
      }

      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout())
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
