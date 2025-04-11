import { useEffect } from "react"
import { useNotification } from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const { state, dispatch } = useNotification()
  useEffect(() => {
    if (state.visible) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [state.visible, dispatch])
  if (!state.visible) return null

  return (
    <div style={style}>
      {state.message}
    </div>
  )
}

export default Notification
