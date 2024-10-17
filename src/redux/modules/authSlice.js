import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: getLocalStorageObj('user'),
  accessToken: localStorage.getItem('access_token'),
  refreshToken: localStorage.getItem('refresh_token'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    setAuthAccessToken(state, action) {
      state.accessToken = action.payload
      localStorage.setItem('access_token', action.payload)
    },
    setAuthRefreshToken(state, action) {
      state.refreshToken = action.payload
      localStorage.setItem('refresh_token', action.payload)
    },
    logout(state) {
      state.user = undefined
      state.accessToken = undefined
      state.refreshToken = undefined
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    },
  },
})

export const { setAuthUser, setAuthAccessToken, setAuthRefreshToken, logout } = authSlice.actions
export const authReducer = authSlice.reducer

function getLocalStorageObj(key) {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : undefined
}
