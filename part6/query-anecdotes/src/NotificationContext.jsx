import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return { message: action.payload, visible: true}
        case 'CLEAR_NOTIFICATION':
            return { message: '', visible: false}
        default: 
            return state
    }
}

export const NotificationProvider = ({children}) => {
    const [state, dispatch] = useReducer(notificationReducer, {
        message: '',
        visible: false,
    })
    
    return (
        <NotificationContext.Provider value={{state, dispatch}}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    return useContext(NotificationContext)
}