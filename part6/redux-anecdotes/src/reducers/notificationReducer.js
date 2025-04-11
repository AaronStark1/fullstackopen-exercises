import { createSlice } from "@reduxjs/toolkit"
const initialState = "message notification"
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(){
            return ''
        }
    }
})

export const setNotificationWithTimeout = (message, duration) => {
    return dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, duration)
    }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer