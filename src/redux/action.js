import { createAsyncThunk } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'
import AuthService from '../services/AuthService'
import { persistor } from './store'

export const onSignIn = createAsyncThunk('auth/sign-in', async (credentials, thunkAPI) => {
  try {
    const response = await AuthService.signIn(credentials)
    const decodedToken = jwtDecode(response.accessToken)
    const account = {
      _id: decodedToken._id,
      username: decodedToken.username,
      role: decodedToken.role,
      accessToken: response.accessToken,
    }

    return account
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || 'Login failed')
  }
})

export const onLogOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await persistor.purge()
    return {}
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || 'Logout failed')
  }
})
