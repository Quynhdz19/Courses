import { createSlice } from "@reduxjs/toolkit"
import { onSignIn, onLogOut } from "./action"

const initialState = {
    account: {
        _id: null,
        username: null,
        role: null,
        accessToken: null,
    },
    loading: "idle",
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateAccount: (state, action) => {
            state.account.username = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(onSignIn.pending, (state, action) => {
                state.loading = "pending"
                state.isLoggedIn = false
            })
            .addCase(onSignIn.fulfilled, (state, action) => {
                state.loading = "idle"
                state.isLoggedIn = true
                state.account = action.payload
            })
            .addCase(onSignIn.rejected, (state, action) => {
                state.isLoggedIn = false
                state.loading = "idle"
            })

            .addCase(onLogOut.pending, (state, action) => {
                state.loading = "pending"
            })
            .addCase(onLogOut.fulfilled, (state, action) => {
                state.account = initialState.account
                state.isLoggedIn = false
                state.loading = "idle"
            })
            .addCase(onLogOut.rejected, (state, action) => {
                state.loading = "idle"
                state.isLoggedIn = false
            })
    },
})

export const { updateAccount } = authSlice.actions

export default authSlice.reducer
